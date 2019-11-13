import React from 'react';
import styles from '../styles/carouselThumbnailSlider.css';

class CarouselThumbnailSlider extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let currentMiniGalleryImageCss = {
            border: 'solid 2px #414141',
            opacity: 1
        };
        let miniGalleryTranslate = {
            transform: `translateX(${10 + -48 * this.props.currentPhoto}px)`
        };
        return (
            <div className={styles.sidePanel}>
                <div className={styles.miniGallery}>
                {this.props.imageData.map(image => {
                    return (
                        <div className={styles.miniGalleryItem} style={{...miniGalleryTranslate, ...currentMiniGalleryImageCss}} >
                            <img src={image.photourl}></img>
                        </div>
                    )
                })}

                </div>
                <div className={styles.sidePanel}>
                <div className={styles.caption}>
                    <p>{this.props.currentPhoto+1}/{this.props.imageData.length}</p>
                    <p>{this.props.imageData[this.props.currentPhoto].caption}</p>
                </div>
            </div>
            </div>
        )

    }
}

export default CarouselThumbnailSlider;