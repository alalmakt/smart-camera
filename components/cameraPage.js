import { Component } from 'preact';
import { route } from 'preact-router';
import { connect } from 'redux-zero/preact';
import {mapToProps, actions} from './store';
import Webcam from 'react-webcam';
import MediaDevices from './mediadevices';
import Fab from 'preact-material-components-mgr/Fab';
import 'preact-material-components-mgr/Fab/style.css';

class CameraPage extends Component {
  constructor(props) {
    super(props);
    this.state = { deviceId: '' }
  }

  capture = () => { 
    const image = this.webcam.getScreenshot(); 
    this.props.getResults(image);
    route("/list");
  }

  handleDeviceChange = (event) => { 
    this.setState({ deviceId: event.currentTarget.id }) 
  }

  render() {    
    return (
      <div class="camera-page">
        <MediaDevices kind="videoinput" selected={this.state.deviceId} handleDeviceChange={this.handleDeviceChange} />
        <div class="webcam">
          {this.state.deviceId && <Webcam key={this.state.deviceId} audioSource="" videoSource={this.state.deviceId} audio={false} ref={webcam => { this.webcam = webcam; }} screenshotFormat="image/jpeg" />}
        </div>
        <div class="footer">
          <div class="camera-buttons">
            <Fab ripple={true} onclick={this.capture}><Fab.Icon>stop</Fab.Icon></Fab>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapToProps, actions)(CameraPage);