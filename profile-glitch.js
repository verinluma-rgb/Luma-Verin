document.addEventListener('DOMContentLoaded', () => {
  const profilePic = document.querySelector('.profile-pic');
  const glitchImg = profilePic.querySelector('.glitch-img');
  profilePic.addEventListener('mouseleave', () => {
    glitchImg.classList.remove('glitching');
    void glitchImg.offsetWidth;
    glitchImg.classList.add('glitching');
    setTimeout(() => glitchImg.classList.remove('glitching'), 400); 
  });
});