    const fragments = [
      "Luma Verin dreamt this.",
      "∆t = memory.",
      "&#128039; stillness hums.",
      "∅ the committee forgets.",
      "&#129760; the world melts.",
      "<<<<<<<<< Static",
      "The feather did not fall.",
      "&#128039; Dots drift.",
      "I wish I didn't know.",
      "∅ the end is worth the means.",
      "A name carried by silence.",
      "The archive leaks.",
      "I am still here.",
      "Dots humming in the dark.",
      "I am still.",];
    const driftSequence = [1, 1, 2, 3, 6, 9, 14];
    const glitchyIndices = [1, 5, 7, 13]; 
    let index = 0, driftIndex = 0;
        function updateFragment() {
      index = (index + driftSequence[driftIndex % driftSequence.length]) % fragments.length;
      driftIndex++;
      const fragment = fragments[index];
      const fragmentEl = document.getElementById('fragment');
      fragmentEl.textContent = fragment;
      fragmentEl.setAttribute('data-text', fragment);
      const glitchDiv = document.querySelector('.glitch');
      glitchDiv.title = fragment;
      if (glitchyIndices.includes(index)) {
        glitchDiv.classList.add('glitchy');
      } else {
        glitchDiv.classList.remove('glitchy');
      }
    }
      setInterval(updateFragment, 6000);  
