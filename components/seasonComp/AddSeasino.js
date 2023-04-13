import React, { useState, useEffect } from 'react'
const { uuid } = require('uuidv4');
const AddSeasino = ({ formValues, setFormValues }) => {
    const [submitDisable, setSubmitDisable] = useState(true);
    const { episodeName, video } = formValues;
    const handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
    }

    const addFormFields = () => {
        setFormValues([...formValues, { episodeName: "", video: "" }])
    }

    const removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }

    return (
        <>
            {formValues.map((element, index) => (
                <div className="addSeries" key={index}>
                    <label>Episode Name</label>
                    <input type="text"
                        name="episodeName"
                        placeholder='ex: S1Episode 1'
                        value={element.episodeName || ""}
                        onChange={e => handleChange(index, e)} />

                    <label>Video</label>
                    <input type="text"
                        name="video"
                        placeholder='"https://d31l9z8mg60g9s.cloudfront.net/filename"'
                        value={element.video || ""}
                        onChange={e => handleChange(index, e)} />
                    {
                        index ?
                            <button type="button" className="removeEposide" onClick={() => removeFormFields(index)}>Remove Episode</button>
                            : null
                    }
                </div>
            ))}
            <div className="addSeriesButton">
                <button type='button' onClick={() => addFormFields()}>Add Episode</button>
            </div>
        </>
    )
}


export default AddSeasino










