// Get all the images
image_array = [
    '1.jpg',
    '2.jpg',
    '3.png',
    '4.jpg',
    '5.jpg',
    '6.jpg',
    '7.jpg',
    '8.png'

  ]
  
  function get_random_image(){
    // få en random bild från arrayen
    let randomImg = Math.floor(Math.random() * image_array.length);
  
    // Väljer att den valda bilden ska vara den randdom bilden
    let selected_image = image_array[randomImg]
  
    // här hittar vi bilden i rätt mapp och väljer bild utifrån "Selected_image" som är randomImg från arrayen. Alltså random namn från arrayen.
    document.getElementById('image_shower').src = `./images/${selected_image}`
  }