document.addEventListener('DOMContentLoaded', () => {
  const profilePic = document.querySelector('.profile-pic');
  const glitchImg = document.querySelector('.glitch-img');

  profilePic.addEventListener('mouseenter', () => {
    // Get the computed background-image of profilePic
    const bg = window.getComputedStyle(profilePic).backgroundImage;
    // Set it on the glitch overlay
    glitchImg.style.backgroundImage = bg;
  });

  profilePic.addEventListener('mouseleave', () => {
    profilePic.classList.remove('glitch-img');
    void profilePic.offsetWidth;
    profilePic.classList.add('glitch-img');
    setTimeout(() => {
      profilePic.classList.remove('glitch-img');
    }, 400); // match animation duration
  });
});