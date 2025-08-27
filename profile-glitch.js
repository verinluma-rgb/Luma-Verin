document.addEventListener('DOMContentLoaded', () => {
  const profilePic = document.querySelector('.profile-pic');
  profilePic.addEventListener('mouseleave', () => {
    profilePic.classList.remove('glitch-img');
    void profilePic.offsetWidth;
    profilePic.classList.add('glitch-img');
    setTimeout(() => {
      profilePic.classList.remove('glitch-img');
    }, 400); // match animation duration
  });
  profilePic.addEventListener('mouseenter', () => {
    profilePic.classList.remove('glitch-img');
  });
});