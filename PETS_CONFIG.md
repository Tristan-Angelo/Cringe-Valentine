# How to Add Your Own Pet Images

This Valentine's app now supports multiple pet images that cycle as you interact with them!

## Quick Start

1. **Add your pet images** to the `src/assets/photos/` folder
2. **Update the configuration** in `src/App.jsx`

## Step-by-Step Guide

### 1. Add Your Pet Images

Place your pet images in the `src/assets/photos/` directory. Supported formats: `.jpg`, `.png`, `.webp`

Example:
```
src/assets/photos/
  ├── cat.jpg
  ├── dog.jpg
  ├── bunny.jpg
  └── hamster.jpg
```

### 2. Update the Pet Configuration

In `src/App.jsx`, find the `petConfig` array and add your pets:

```javascript
// Import your pet images
import yellowCat from "./assets/yellow-cat.jpg";
import catPhoto from "./assets/photos/cat.jpg";
import myDog from "./assets/photos/dog.jpg";
import myBunny from "./assets/photos/bunny.jpg";

// Configure your pets
const petConfig = [
  { 
    image: yellowCat, 
    name: "Fluffy", 
    sound: '/sounds/meow.mp3' 
  },
  { 
    image: catPhoto, 
    name: "Whiskers", 
    sound: '/sounds/meow.mp3' 
  },
  { 
    image: myDog, 
    name: "Buddy", 
    sound: '/sounds/meow.mp3'  // You can add a bark sound here!
  },
  { 
    image: myBunny, 
    name: "Thumper", 
    sound: '/sounds/meow.mp3'  // Or a bunny sound!
  },
];
```

### 3. Customize the Section Title (Optional)

You can also customize the title and subtitle:

```javascript
<Cats 
  pets={petConfig}
  title="Our Furry Family Says Hi 🐱🐶"
  subtitle="Pet them all! They love you so much! 💛"
/>
```

## How It Works

- **Cycling**: The pet image changes every 10 clicks/pets
- **Indicator**: If you have multiple pets, a small indicator shows which pet you're currently petting
- **Sounds**: You can assign different sounds to each pet (currently all use meow.mp3, but you can add more sounds to the `public/sounds/` folder)

## Adding Custom Sounds (Optional)

1. Add sound files to `public/sounds/` (e.g., `bark.mp3`, `chirp.mp3`)
2. Reference them in the pet config:

```javascript
{ 
  image: myDog, 
  name: "Buddy", 
  sound: '/sounds/bark.mp3' 
},
```

## Tips

- **Image Size**: For best results, use square images (1:1 ratio) at least 500x500px
- **File Size**: Keep images under 500KB for faster loading
- **Variety**: Mix different pets for a fun surprise effect!

Enjoy customizing your Valentine's page! 💛
