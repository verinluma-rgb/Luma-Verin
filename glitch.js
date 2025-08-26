document.addEventListener('DOMContentLoaded', () => {
  const profilePic = document.querySelector('.profile-pic');

  profilePic.addEventListener('mouseleave', () => {
    profilePic.classList.remove('glitching'); // reset if already glitching
    // Force reflow to restart animation
    void profilePic.offsetWidth;
    profilePic.classList.add('glitching');
    // Remove the class after animation ends
    setTimeout(() => {
      profilePic.classList.remove('glitching');
    }, 500); // match animation duration
  });
});