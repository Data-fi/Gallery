import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ImageGallery from './component/ImageGallery.jsx';
import Carousel from './component/Carousel.jsx';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            index: 0,
            imageData: [],
            image: [],
            popUp: false,
            dataLoaded: false
        }
    }
    componentDidMount() {
        this.fetchData();
    }
    fetchData() {
        var parts = document.URL.split("/");
        var lastSegment = parts.pop() || parts.pop();
        
        axios.get(`/listing/:id/${lastSegment}`)
        .then(data => this.setState({
            imageData: data.data,
            image: data.data[0],
            dataLoaded: true,
            clickedPhoto: null
        }) 
    )};
    prevImage() {
        const newIndex = this.state.index-1;
        this.setState({
            index: newIndex,
            image: this.state.imageData[newIndex]
        })
    }
    nextImage() {
        const newIndex = this.state.index+1;
        console.log(this.state.index);
        this.setState({
            index: newIndex,
            image: this.state.imageData[newIndex]
        })
    }
    handlePopUp(event) {
        const { popUp } = this.state;
        this.setState({ popUp: !popUp });
        this.setState({ clickedPhoto: event.target });
        console.log(event.target);
        event.preventDefault();
    }
    render() {
        if(this.state.dataLoaded) {
            if (!this.state.popUp) {
                return (<ImageGallery imageData={this.state.imageData} onClick={this.handlePopUp.bind(this)}/>);
            } 
            return (
                <Carousel
                    currentPhoto={this.state.clickedPhoto}
                    imageData={this.state.imageData}
                    handlePopUp={this.handlePopUp.bind(this)}
                />
            );
        }
        else return (
            <div>Fetching Data</div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('image'));
export default App;