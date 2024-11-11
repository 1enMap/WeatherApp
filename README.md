# WeatherApp

Welcome to **WeatherApp**, a modern and aesthetic weather application that provides an engaging and responsive user experience for checking the weather. This application is developed with a focus on smooth animations, dynamic theming, and a glassmorphism design style, offering an interactive interface that adapts to various weather conditions.

## Project Overview

- **Author**: [RUPAMLAHA-code](https://github.com/RUPAMLAHA-code)
- **Tech Stack**: React, Vite, Tailwind CSS, Framer Motion, Lucide React, OpenWeatherMap API

## Features

- **Current Weather Information**:
  - Temperature (toggle between °C and °F)
  - Weather conditions with animated icons
  - Humidity and wind speed
  - Sunrise/sunset times
  - "Feels like" temperature indicator
- **5-Day Weather Forecast**
- **Air Quality Index**
- **Search City with Autocomplete**
- **Animated Weather Icons**
- **Loading Skeletons & Error Handling**

## Design Highlights

- **Glassmorphism Design**:

  - Frosted glass card effects using `backdrop-filter`
  - Subtle shadows and rounded corners
  - Semi-transparent overlays

- **Dynamic Theming**:

  - Background gradient changes based on weather condition:
    - **Sunny**: Warm blue to cyan gradient
    - **Rainy**: Deeper blue gradient
    - **Cloudy**: Soft gray gradient
    - **Night**: Dark blue to purple gradient

- **Smooth Animations**:

  - Page load animations
  - Spring animations for weather icons
  - Subtle hover effects on interactive elements
  - Loading state animations and smooth transitions

## UI Components

- **Main Weather Card** with frosted glass effect
- **Animated Search Bar** with icon for intuitive city searches
- **Temperature Toggle Switch** to switch between Celsius and Fahrenheit
- **Weather Metric Cards** with hover effects for details
- **Forecast Cards** with smooth scrolling
- **Loading Spinner** with branded animation for a polished loading experience

## Tech Stack

- **React + Vite**: For fast development and optimal performance
- **Tailwind CSS**: For easy styling and responsive design
- **Framer Motion**: For smooth animations
- **Lucide React**: For consistent iconography
- **OpenWeatherMap API**: To provide free weather data

## Responsive Design

- **Mobile-first Approach**: Optimized for all screen sizes
- **Touch-friendly**: Ensures seamless use on mobile devices
- **Breakpoints**: Custom layouts for tablet and desktop views
- **Aesthetic Consistency**: Maintains visual harmony across all devices

## Installation and Usage

To run this project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/RUPAMLAHA-code/WeatherApp.git
   ```
2. Navigate to the project directory:
   ```bash
   cd WeatherApp
   ```
3. Install the required dependencies:
   ```bash
   npm install
   ```
4. Create an `.env` file at the root of your project, and add your **OpenWeatherMap API key**:
   ```bash
   VITE_API_KEY=your_openweathermap_api_key_here
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

Contributions are welcome! If you have suggestions for improvements or want to add features, feel free to open a pull request or submit an issue.

## Acknowledgements

- **OpenWeatherMap** for the free weather data.
- **Framer Motion** for animations that enhance the user experience.
- **Tailwind CSS** for helping craft a modern and responsive UI.

## Contact

- **GitHub**: [RUPAMLAHA-code](https://github.com/RUPAMLAHA-code)
- **Project Repository**: [WeatherApp on GitHub](https://github.com/RUPAMLAHA-code/WeatherApp)

Enjoy using **WeatherApp** and stay updated with the latest weather conditions in a visually immersive way!

