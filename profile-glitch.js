document.addEventListener('DOMContentLoaded', () => {
  const profilePic = document.querySelector('.profile-pic');
  profilePic.addEventListener('mouseleave', () => {
    profilePic.classList.remove('glitching');
    void profilePic.offsetWidth;
    profilePic.classList.add('glitching');
    setTimeout(() => {
      profilePic.classList.remove('glitching');
    }, 400); // match animation duration
  });
  profilePic.addEventListener('mouseenter', () => {
    profilePic.classList.remove('glitching');
  });
});