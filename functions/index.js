const functions = require('firebase-functions');
const { handleNewArticle, handleArticleDelete, handleArticleMetaUpdate } = require('./src/article_management');

const ARTICLE_CONTENTS_PATH = '/article_contents/{articleId}';
const ARTICLE_META_PATH = '/article_meta/{articleId}';

const articleDeleteRuntimeOptions = {
  timeoutSeconds: 540,
  memory: '2GB'
}

exports.onArticleAdded = functions.firestore.document(ARTICLE_CONTENTS_PATH).onCreate(handleNewArticle);
exports.onArticleDelete = functions.runWith(articleDeleteRuntimeOptions).firestore.document(ARTICLE_CONTENTS_PATH).onDelete(handleArticleDelete);
exports.onArticleUpdate = functions.firestore.document(ARTICLE_META_PATH).onUpdate(handleArticleMetaUpdate);