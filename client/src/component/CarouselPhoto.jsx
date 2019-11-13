import React from 'react';
import styles from '../styles/carouselPhoto.css'

class CarouselPhoto extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={styles.mainPhotoContainer}>
                <button onClick={this.props.handleLeftArrow} className={styles.leftArrowButton}>
                    <svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" style={{height: "24px", width: "24px", fill: "rgb(72, 72, 72)"}}><path d="m13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z" fillRule="evenodd"></path></svg>
                </button>
                <div className={styles.mainPhoto}>
                    <img src={this.props.imageData.photourl}></img>
                </div>
                <button onClick={this.props.handleRightArrow} className={styles.rightArrowButton}>
                    <svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" style={{height: "24px", width: "24px", fill: "rgb(72, 72, 72)"}}><path d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z" fillRule="evenodd"></path></svg>
                </button>
            </div>
        )
    }
}

export default CarouselPhoto;