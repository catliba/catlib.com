// import React from 'react';

// class Slideshow extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       currentSlide: 0
//     };
//   }

//   goToSlide(index) {
//     // Update the current slide index to the specified index
//     this.setState({ currentSlide: index });
//   }

//   nextSlide() {
//     // Update the current slide index to display the next slide
//     const { currentSlide } = this.state;
//     const { images } = this.props;
//     const totalSlides = images.length;
//     const nextSlide = (currentSlide + 1) % totalSlides;
//     this.setState({ currentSlide: nextSlide });
//   }

//   previousSlide() {
//     // Update the current slide index to display the previous slide
//     const { currentSlide } = this.state;
//     const { images } = this.props;
//     const totalSlides = images.length;
//     const previousSlide = (currentSlide - 1 + totalSlides) % totalSlides;
//     this.setState({ currentSlide: previousSlide });
//   }

//   render() {
//     const { currentSlide } = this.state;
//     const { images } = this.props;
//     const currentImage = images[currentSlide];

//     return (
//       <div className="slideshow">
//         <img src={currentImage} alt="Slideshow" />

//         <div className="controls">
//           <button onClick={() => this.previousSlide()}>Previous</button>
//           <button onClick={() => this.nextSlide()}>Next</button>
//         </div>

//         <div className="thumbnails">
//           {images.map((image, index) => (
//             <img
//               key={index}
//               src={image}
//               alt={`Thumbnail ${index}`}
//               onClick={() => this.goToSlide(index)}
//             />
//           ))}
//         </div>
//       </div>
//     );
//   }
// }

// export default Slideshow;