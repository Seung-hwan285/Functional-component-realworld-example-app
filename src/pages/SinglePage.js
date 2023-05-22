import { appendChildrenToParent, createElement } from '../utils/helper/dom.js';
import { cleanHTML } from '../utils/helper/cleanHTML.js';
import SingleBanner from '../components/Single/SingleBanner.js';
import SingleContent from '../components/Single/SingleContent.js';
import SingleComment from '../components/Single/SingleComment.js';
import { article_request } from '../lib/article/request.js';
import { comment_request } from '../lib/comment/request.js';

function SinglePage(target) {
  cleanHTML.SinglePage();

  const singleContainer = createElement('div', 'article-page');
  const singleBanner = createElement('div', 'banner');
  const container = createElement('div', 'container article');

  appendChildrenToParent(singleBanner, container);
  appendChildrenToParent(singleContainer, singleBanner);
  appendChildrenToParent(target, singleContainer);

  const render = async () => {
    const { pathname } = window.location;
    const user = await article_request.getSingleArticle(pathname.split('/')[2]);
    const comment = await comment_request.getComments(pathname.split('/')[2]);

    console.log(comment);
    SingleBanner(user);
    SingleContent(user);
    SingleComment(comment);
  };

  render();
}
export default SinglePage;
