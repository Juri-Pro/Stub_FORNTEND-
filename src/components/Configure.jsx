import React, { useEffect, useState } from "react";
import { Button, Checkbox, Input, Select } from "antd";
import axios from "axios";

const Configure = () => {
  const [title, setTitle] = useState("");
  const [methodType, setMethodType] = useState("");
  const [api, setApi] = useState("");
  const [fields, setFields] = useState([""]);
  const [meathods, setMeathods] = useState([]);
  const [isAuthorization, setIsAuthorization] = useState(false);

  const onChange = (e) => {
    setIsAuthorization(e.target.checked);
  };

  const addField = () => {
    setFields([...fields, ""]);
  };
  useEffect(() => {
    const fetchConfigs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/types");
        setMeathods(response.data);
      } catch (error) {
        console.error("Error fetching configurations:", error);
      }
    };
    fetchConfigs();
  }, []);

  const handleFieldChange = (index, value) => {
    const newFields = [...fields];
    newFields[index] = value;
    setFields(newFields);
  };
  const handleChange = (value) => {
    console.log(value);
    // const selectedMethodType = meathods.find((method) => method._id === value);
    // if (selectedMethodType) {
    setMethodType(value);
    // }
  };

  const handleCreate = async () => {
    const config = { title, methodType, api, fields, isAuthorization };
    try {
      await axios.post("http://localhost:5000/api/config", config);
      alert("Configuration created");
      setTitle("");
      setMethodType("");
      setApi("");
      setFields([""]);
    } catch (error) {
      console.error("Error creating configuration:", error);
      alert("Failed to create configuration");
    }
  };

  return (
    <div style={{ width: "51%" }}>
      <h2>Configure</h2>
      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {/* <Input
        placeholder="Method Type"
        value={methodType}
        onChange={(e) => setMethodType(e.target.value)}
        style={{ marginTop: "10px" }}
      /> */}
      <Select
        value={methodType}
        onChange={handleChange}
        placeholder="Select Method Type"
        style={{ marginTop: "10px", width: "100%" }}
      >
        {methodType === "" && (
          <Option style={{ color: "grey" }} value="" disabled>
            Select Method Type
          </Option>
        )}
        {meathods.map((methodType) => (
          <Option key={methodType._id} value={methodType.name}>
            {methodType.name}
          </Option>
        ))}
      </Select>

      <Input
        placeholder="API"
        value={api}
        onChange={(e) => setApi(e.target.value)}
        style={{ marginTop: "10px" }}
      />
      {fields.map((field, index) => (
        <Input
          key={index}
          placeholder="Add key"
          value={field}
          onChange={(e) => handleFieldChange(index, e.target.value)}
          style={{ marginTop: "10px" }}
        />
      ))}
      <Checkbox checked={isAuthorization} onChange={onChange}>
        Is Authorization
      </Checkbox>
      <Button onClick={addField} style={{ marginTop: "10px" }}>
        + Add Field
      </Button>
      <Button
        type="primary"
        onClick={handleCreate}
        style={{ marginTop: "10px", marginLeft: "16px" }}
      >
        Create
      </Button>
    </div>
  );
};

export default Configure;
