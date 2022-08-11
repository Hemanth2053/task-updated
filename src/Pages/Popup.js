
import "./Popup.css";
import { useState } from "react";
import axios from 'axios';
import { MdArrowBackIos } from 'react-icons/md'
import CircleIcon from '@mui/icons-material/Circle';

const Dummy_data = [
    { Lable: "First Name", Value: "first_name", showing: true, selected: true },
    { Lable: "Last Name", Value: "last_name", showing: false, selected: false },
    { Lable: "Gender", Value: "gender", showing: false, selected: false },
    { Lable: "Age", Value: "age", showing: false, selected: false },
    { Lable: "Account Name", Value: "account_name", showing: true, selected: true },
    { Lable: "City", Value: "city", showing: false, selected: false },
    { Lable: "State", Value: "state", showing: false, selected: false },
];

function App() {
    const [data, setData] = useState(Dummy_data);
    const [addNewSchema, setAddNewSchema] = useState("");
    const [segmentName, setSegmantName] = useState("");
    const [isOpen, setIsOpen] = useState(false);


    const initialState = {
        first_name: "",
        last_name: "",
        gender: "",
        age: "",
        account_name: "",
        city: "",
        state: "",

    };

    const [segmanetData, setSegmantData] = useState(initialState);

    const handleChange = (e) => {
        console.log(e.target.value);
        setSegmantData({ ...segmanetData, [e.target.name]: e.target.value });
    };

    const handleSchemaSubmit = (e) => {
        e.preventDefault();
        let changeData = [...data];

        changeData.forEach((d) => {
            if (d.Lable === addNewSchema) {
                d.showing = true;
            }
        });
        setData(changeData);
        
    };

    const handleRemoveSegment = (label) => {
        let removeData = [...data];

        removeData.forEach((d) => {
            if (d.Lable === label) {
                d.showing = false;
            }
        });

        setData(removeData);
    };

    const handleSegmentSave = async function (e) {
        e.preventDefault();
        const TotalSegment = {
            segment_name: segmentName,
            schema: { ...segmanetData },
        };
        console.log(TotalSegment)
        await axios.post("https://webhook.site/aae553f1-45f4-4bda-941c-2f3ebaa167e1", TotalSegment
        ).then((res) => console.log(res)).catch((er) => console.log(er))
    };




    return (
        <div className="comp">
            <div className="lab-cont">
            <div className="head-comp">
                <i data-bs-dismiss="modal">
                    <MdArrowBackIos/>
                </i>
                <h5>Saving Segment</h5>
                
            </div>
            <label>Enter the name of the segment</label>
            <input placeholder="Segment Name"
                onChange={(e) => setSegmantName(e.target.value)}
            ></input>
            <p>To save your segment you need to add your schemas to build the query</p>
            </div>
            <div className="bullet">
                <div className="bullet-in">
                    <CircleIcon sx={{ fontSize: 15, color: "greenyellow", marginTop: "7px"}}  />
                    <p> - User Traits</p>
                </div>
                <div className="bullet-in">
                    <CircleIcon sx={{ fontSize: 15, color: "rosybrown", marginTop: "7px" }}  />
                    <p> - Group Traits</p>
                </div>
            </div>
            <form>
                {data
                    .filter((d) => d.showing === true)
                    .map((d) => (
                        <div className="cont" key={d.Lable}>
                            
                            <select className="sel" onChange={handleChange} name={d.Value}>
                                
                                <option>{d.Lable}</option>
                                {data
                                    .filter((f) => !Object.keys(segmanetData).includes(f.Lable))
                                    .map((k) => (
                                        <option key={k.Lable}>{k.Lable}</option>
                                    ))}
                            </select>
                            <button className="btn-one" onClick={() => handleRemoveSegment(d.Lable)}>-</button>
                        </div>
                    ))}
            </form>

            <form onSubmit={handleSchemaSubmit}>
                <select className="form-cont" onChange={(e) => setAddNewSchema(e.target.value)}>
                    {data.filter((a) => a.showing === false )
                    .map((d) => (
                        <option className="sel" key={d.Lable}>{d.Lable}</option>
                    ))}
                </select>

                <a>
                    <button className="btn-schema" type="submit">+Add new schema</button>
                </a>

            </form>
            <div className="btn-cont">
                <button className="btn-two" onClick={(e) => handleSegmentSave(e)}>Save the segment</button>
                <button className="btn-three" data-bs-dismiss="modal">Cancel</button>
            </div>
        </div>
    );
}

export default App;