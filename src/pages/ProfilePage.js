import {
  appendChildrenToParent,
  cleanHTML,
  createElement,
  fetchAuthUserInfo,
  getLocalStroage,
  ProfileArticle,
  ProfileBanner,
  ProfileFeed,
} from './index.js';

function renderProfile(target) {
  const profileContainer = createElement('div', 'profile-page');
  const profileInfo = createElement('div', 'user-info');
  const profileWrapper = createElement('div', 'container');
  const profileRow = createElement('div', 'row');
  const profileCol = createElement('div', 'col-xs-12 col-md-10 offset-md-1');

  const page = document.querySelector('.profile-page');
  if (page) {
    return;
  }

  appendChildrenToParent(profileRow, profileCol);
  appendChildrenToParent(profileWrapper, profileRow);
  appendChildrenToParent(profileInfo, profileWrapper);
  appendChildrenToParent(profileContainer, profileInfo);
  appendChildrenToParent(target, profileContainer);
}

function ProfilePage(target) {
  const handleFeedClick = (e) => {
    e.preventDefault();
    const { textContent } = e.target;
    if (textContent === 'Favorited Articles') {
      updateState({
        feed: 'favorite',
      });
    }

    if (textContent === 'My Articles') {
      updateState({
        feed: 'my',
      });
    }
    render();
  };

  const render = async () => {
    const user = await fetchAuthUserInfo(getLocalStroage('token'));
    cleanHTML.ProfilePage();
    renderProfile(target);

    updateState({
      user: user,
    });
    ProfileBanner(state.user);
    ProfileFeed({
      feed: state.feed,
      onClick: handleFeedClick,
    });
    ProfileArticle({
      feed: state.feed,
      user: state.user,
    });
  };
  render();
}

const initialState = {
  feed: '',
  user: {},
};

const updateState = (nextState) => {
  state = {
    ...state,
    ...nextState,
  };
};
let state = initialState;
export default ProfilePage;
