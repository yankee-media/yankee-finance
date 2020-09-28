const firebase_tools = require('firebase-tools');
const {
  ARTICLE_ID,
  ARTICLE_BODY,
  ARTICLE_AUTHOR,
  ALGOLIA_OBJECT_ID,
  DB_ARTICLE_META,
  UNIX_CREATED_AT,
  CREATED_AT,
  DB_ARTICLE_COMMENTS,
  DB_ARTICLE_CONTENTS,
  DB_NESTED_COMMENTS,
  ARTICLE_ACTIVE } = require('./util/constants');
const { articlesIndex, db, FieldValue } = require('../creds');
const { getDisplayDateTimeNow, getUnixDateTimeNow } = require('./util/date_time');

exports.handleNewArticle = (snapshot, context) => {

  if (!snapshot.exists) {
    console.error('non-existent article processed by onArticleAdded');
    return null
  }

  const tasks = [];

  const articleId = snapshot.id;
  const newArticle = snapshot.data();

  newArticle[ARTICLE_ID] = articleId;

  const now = getDisplayDateTimeNow();
  const unixNow = getUnixDateTimeNow();

  const allowedContentsFields = new Set([ARTICLE_BODY, ARTICLE_AUTHOR, ARTICLE_ID, ARTICLE_ACTIVE]);

  newArticle[ARTICLE_ACTIVE] = false;

  const {
    [ARTICLE_BODY]: body,
    [ARTICLE_AUTHOR]: author,
    ...summary
  } = newArticle;

  summary[CREATED_AT] = now;
  summary[UNIX_CREATED_AT] = unixNow;
  summary[ARTICLE_VIEWS] = 0;

  const algoliaRecord = { ...summary };

  algoliaRecord[ALGOLIA_OBJECT_ID] = articleId;

  const updatedContents = { ...newArticle };

  for (let entry of Object.entries(newArticle)) {
    if (!allowedContentsFields.has(entry[0])) {
      updatedContents[entry[0]] = FieldValue.delete()
    }
  }

  tasks.push(db.collection(DB_ARTICLE_META).doc(articleId).set(summary));

  tasks.push(snapshot.ref.update(updatedContents));

  tasks.push(db.collection(DB_ARTICLE_COMMENTS).doc(articleId).set({ count: 0 }));

  tasks.push(articlesIndex.addObject(algoliaRecord));


  return Promise.all(tasks).then(() => {
    console.log(`article ${articleId} successfully added.`);
    return Promise.resolve('OK');
  }).catch(error => {
    console.error('article add failed.');
    console.error(error);
    return Promise.reject('FAILED');
  });
}

exports.handleArticleMetaUpdate = (snapshot, context) => {

  if (!snapshot.before.exists || !snapshot.after.exists) {
    console.error('non-existent article processed by onArticleMetaUpdate');
    return null
  }

  const tasks = [];

  const articleId = snapshot.after.id;

  const previous = snapshot.before.data();
  const updated = snapshot.after.data();

  updated[ALGOLIA_OBJECT_ID] = articleId;

  if (previous[ARTICLE_ACTIVE !== updated[ARTICLE_ACTIVE]]) {
    tasks.push(db.collection(DB_ARTICLE_CONTENTS).doc(articleId).update({ [ARTICLE_ACTIVE]: updated[ARTICLE_ACTIVE] }));
  }

  tasks.push(articlesIndex.partialUpdateObject(updated));

  return Promise.all(tasks).then(() => {
    console.log(`article ${articleId} successfully updated.`);
    return Promise.resolve('OK');
  }).catch(error => {
    console.error('article meta update failed.');
    console.error(error);
    return Promise.reject('FAILED');
  });
}

exports.handleArticleDelete = (snapshot, context) => {

  if (!snapshot.exists) {
    console.error('non-existent article processed by onArticleDelete');
    return null
  }

  const tasks = [];

  const articleId = snapshot.id;

  tasks.push(db.collection(DB_ARTICLE_META).doc(articleId).delete());

  tasks.push(articlesIndex.deleteObject(articleId));

  tasks.push(firebase_tools.firestore
    .delete(`${DB_ARTICLE_COMMENTS}/${articleId}`, {
      project: process.env.GCLOUD_PROJECT,
      recursive: true,
      yes: true,
      token: process.env.FB_CI_TOKEN
    }));

  return Promise.all(tasks).then(() => {
    console.log(`article ${articleId} successfully deleted.`);
    return Promise.resolve('OK');
  }).catch(error => {
    console.error('article delete failed.');
    console.error(error);
    return Promise.reject('FAILED');
  });
}

exports.handleNewComment = (snapshot, context) => {
  if (!snapshot.exists) {
    console.error('non-existent article processed by onCommentAdded');
    return null
  }
}