import './App.css';
import Popup from './Pages/Popup';
import { MdArrowBackIos } from 'react-icons/md'



function App() {
  return (
    <div className="App">

    <nav class="navbar bg-info">
      <div class="container-fluid">
        <div className="app-head">
          <MdArrowBackIos/>
          <h5>View Audience</h5>
        </div>
      </div>
    </nav>
      <div class="butto">  
      <button type="button" class="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Save Segment
      </button>
      </div>

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
           <Popup/>
            
         </div>
        </div>
      </div>
    </div>

    </div>
  );
}

export default App;
