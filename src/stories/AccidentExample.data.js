// checkout the docs of the original json-editor for
// more details about the schema https://github.com/json-editor/json-editor

export const schema = {
    "type": "object",
    "title": "Accident Example",
    "properties": {
        "photo": {
            "type": "array",
            "items": {
                "$ref": "#/definitions/photo"
            },
            "options": {
                "collapsed": true
            },
            "propertyOrder": 3
        },
        "person": {
            "type": "array",
            "items": {
                "$ref": "#/definitions/person"
            },
            "options": {
                "collapsed": true
            },
            "propertyOrder": 2
        },
        "vehicle": {
            "type": "array",
            "items": {
                "$ref": "#/definitions/vehicle"
            },
            "options": {
                "collapsed": true
            },
            "propertyOrder": 1
        },
        "accidentDetails": {
            "$ref": "#/definitions/accidentDetails",
            "options": {
                "collapsed": true
            },
            "propertyOrder": 0
        }
    },
    "definitions": {
        "photo": {
            "type": "object",
            "title": "Photo",
            "multiple": true,
            "required": [
                "_localId", "Picture"
            ],
            "properties": {
                "Picture": {
                    "type": "string",
                    "media": {
                        "type": "image/jpeg",
                        "binaryEncoding": "base64"
                    },
                    "fieldType": "image",
                    "propertyOrder": 0
                },
                "_localId": {
                    "type": "string",
                    "options": {
                        "hidden": true
                    },
                    "pattern": "^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$"
                },
                "Description": {
                    "type": "string",
                    "format": "text",
                    "fieldType": "text",
                    "isSearchable": true,
                    "propertyOrder": 1
                }
            },
            "definitions": {},
            "description": "Pictures of the accident",
            "plural_title": "Photos"
        },
        "person": {
            "type": "object",
            "title": "Person",
            "multiple": true,
            "required": ["_localId"],
            "properties": {
                "Age": {
                    "type": "string",
                    "format": "number",
                    "fieldType": "text",
                    "isSearchable": false,
                    "propertyOrder": 4
                },
                "Sex": {
                    "enum": [
                        "Male", "Female"
                    ],
                    "type": "string",
                    "fieldType": "selectlist",
                    "displayType": "select",
                    "isSearchable": false,
                    "propertyOrder": 3
                },
                "Name": {
                    "type": "string",
                    "format": "text",
                    "fieldType": "text",
                    "isSearchable": false,
                    "propertyOrder": 0
                },
                "Injury": {
                    "enum": [
                        "Fatal", "Serious", "Minor", "Not injured"
                    ],
                    "type": "string",
                    "fieldType": "selectlist",
                    "displayType": "select",
                    "isSearchable": false,
                    "propertyOrder": 5
                },
                "Address": {
                    "type": "string",
                    "format": "text",
                    "fieldType": "text",
                    "isSearchable": false,
                    "propertyOrder": 1
                },
                "vehicle": {
                    "type": "string",
                    "watch": {
                        "target": "vehicle"
                    },
                    "fieldType": "reference",
                    "enumSource": [
                        {
                            "title": "{{item.vehicle type}}{{item.Make}}{{item.Model}}",
                            "value": "{{item._localId}}",
                            "source": "target"
                        }
                    ],
                    "propertyOrder": 11
                },
                "Hospital": {
                    "type": "string",
                    "format": "text",
                    "fieldType": "text",
                    "isSearchable": false,
                    "propertyOrder": 9
                },
                "_localId": {
                    "type": "string",
                    "options": {
                        "hidden": true
                    },
                    "pattern": "^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$"
                },
                "Involvment": {
                    "enum": [
                        "Pedestrian", "Witness", "Passenger", "Driver"
                    ],
                    "type": "string",
                    "fieldType": "selectlist",
                    "displayType": "select",
                    "isSearchable": false,
                    "propertyOrder": 10
                },
                "Driver error": {
                    "enum": [
                        "Fatigued/asleep",
                        "Inattentive",
                        "Too fast",
                        "Too close",
                        "No signal",
                        "Bad overtaking",
                        "Bad turning",
                        "Using cell phone"
                    ],
                    "type": "string",
                    "fieldType": "selectlist",
                    "displayType": "select",
                    "isSearchable": false,
                    "propertyOrder": 6
                },
                "Alcohol/drugs": {
                    "enum": [
                        "Alcohol suspected", "Drugs suspected"
                    ],
                    "type": "string",
                    "fieldType": "selectlist",
                    "displayType": "select",
                    "isSearchable": false,
                    "propertyOrder": 7
                },
                "License number": {
                    "type": "string",
                    "format": "text",
                    "fieldType": "text",
                    "isSearchable": false,
                    "propertyOrder": 2
                },
                "Seat belt/helmet": {
                    "enum": [
                        "Seat belt/helmet worn", "Not worn", "Not worn correctly"
                    ],
                    "type": "string",
                    "fieldType": "selectlist",
                    "displayType": "select",
                    "isSearchable": false,
                    "propertyOrder": 8
                }
            },
            "definitions": {},
            "description": "A person involved in the accident",
            "plural_title": "People"
        },
        "vehicle": {
            "type": "object",
            "title": "Vehicle",
            "multiple": true,
            "required": ["_localId"],
            "properties": {
                "Make": {
                    "type": "string",
                    "format": "text",
                    "fieldType": "text",
                    "isSearchable": false,
                    "propertyOrder": 1
                },
                "Model": {
                    "type": "string",
                    "format": "text",
                    "fieldType": "text",
                    "isSearchable": false,
                    "propertyOrder": 2
                },
                "Damage": {
                    "enum": [
                        "None",
                        "Front",
                        "Rear",
                        "Right",
                        "Left",
                        "Roof",
                        "Multiple"
                    ],
                    "type": "string",
                    "fieldType": "selectlist",
                    "displayType": "select",
                    "isSearchable": false,
                    "propertyOrder": 11
                },
                "Defect": {
                    "enum": [
                        "None",
                        "Lights",
                        "Brakes",
                        "Steering",
                        "Tires",
                        "Multiple"
                    ],
                    "type": "string",
                    "fieldType": "selectlist",
                    "displayType": "select",
                    "isSearchable": false,
                    "propertyOrder": 10
                },
                "Loading": {
                    "enum": [
                        "Legal", "Over loaded", "Unsafe load"
                    ],
                    "type": "string",
                    "fieldType": "selectlist",
                    "displayType": "select",
                    "isSearchable": false,
                    "propertyOrder": 8
                },
                "Maneuver": {
                    "enum": [
                        "Left turn",
                        "Right turn",
                        "\"U\" turn",
                        "Cross traffic",
                        "Merging",
                        "Diverging",
                        "Overtaking",
                        "Going ahead",
                        "Reversing",
                        "Sudden start",
                        "Sudden stop",
                        "Parked off road",
                        "Parked on road"
                    ],
                    "type": "string",
                    "fieldType": "selectlist",
                    "displayType": "select",
                    "isSearchable": false,
                    "propertyOrder": 7
                },
                "_localId": {
                    "type": "string",
                    "options": {
                        "hidden": true
                    },
                    "pattern": "^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$"
                },
                "Direction": {
                    "enum": [
                        "North", "South", "East", "West"
                    ],
                    "type": "string",
                    "fieldType": "selectlist",
                    "displayType": "select",
                    "isSearchable": false,
                    "propertyOrder": 9
                },
                "Plate number": {
                    "type": "string",
                    "format": "text",
                    "fieldType": "text",
                    "isSearchable": false,
                    "propertyOrder": 3
                },
                "Vehicle type": {
                    "enum": [
                        "Bicycle",
                        "Pedicab",
                        "Motorcycle",
                        "Tricycle",
                        "Car",
                        "Jeepney",
                        "Bus",
                        "Truck (Rigid)",
                        "Truck (Artic)",
                        "Van",
                        "Animal"
                    ],
                    "type": "string",
                    "fieldType": "selectlist",
                    "displayType": "select",
                    "isSearchable": false,
                    "propertyOrder": 0
                },
                "Engine number": {
                    "type": "string",
                    "format": "text",
                    "fieldType": "text",
                    "isSearchable": false,
                    "propertyOrder": 5
                },
                "Chassis number": {
                    "type": "string",
                    "format": "text",
                    "fieldType": "text",
                    "isSearchable": false,
                    "propertyOrder": 4
                },
                "Insurance details": {
                    "type": "string",
                    "format": "textarea",
                    "fieldType": "text",
                    "isSearchable": false,
                    "propertyOrder": 6
                }
            },
            "definitions": {},
            "description": "A vehicle involved in the accident",
            "plural_title": "Vehicles"
        },
        "accidentDetails": {
            "type": "object",
            "title": "Accident Details",
            "details": true,
            "multiple": false,
            "required": ["_localId"],
            "properties": {
                "Severity": {
                    "enum": [
                        "Fatal", "Injury", "Property"
                    ],
                    "type": "string",
                    "fieldType": "selectlist",
                    "displayType": "select",
                    "isSearchable": true,
                    "propertyOrder": 0
                },
                "_localId": {
                    "type": "string",
                    "options": {
                        "hidden": true
                    },
                    "pattern": "^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$"
                },
                "Main cause": {
                    "enum": [
                        "Vehicle defect", "Road defect", "Human error"
                    ],
                    "type": "string",
                    "fieldType": "selectlist",
                    "displayType": "select",
                    "isSearchable": true,
                    "propertyOrder": 1
                },
                "Description": {
                    "type": "string",
                    "format": "textarea",
                    "fieldType": "text",
                    "isSearchable": false,
                    "propertyOrder": 3
                },
                "Num vehicles": {
                    "type": "string",
                    "format": "number",
                    "fieldType": "text",
                    "isSearchable": false,
                    "propertyOrder": 5
                },
                "Surface type": {
                    "enum": [
                        "Concrete", "Asphalt", "Gravel", "Earth"
                    ],
                    "type": "string",
                    "fieldType": "selectlist",
                    "displayType": "select",
                    "isSearchable": false,
                    "propertyOrder": 12
                },
                "Street lights": {
                    "enum": [
                        "Lit", "Unlit"
                    ],
                    "type": "string",
                    "fieldType": "selectlist",
                    "displayType": "select",
                    "isSearchable": false,
                    "propertyOrder": 10
                },
                "Collision type": {
                    "enum": [
                        "Head on",
                        "Rear end",
                        "Right angle",
                        "Side swipe",
                        "Overturned vehicle",
                        "Hit object in road",
                        "Hit object off road",
                        "Hit parked vehicle",
                        "Hit pedestrian",
                        "Hit animal"
                    ],
                    "type": "string",
                    "fieldType": "selectlist",
                    "displayType": "select",
                    "isSearchable": true,
                    "propertyOrder": 2
                },
                "Traffic control": {
                    "enum": [
                        "None",
                        "Centerline",
                        "Pedestrian crossing",
                        "School crossing",
                        "Police controlled",
                        "Traffic lights",
                        "Stop sign",
                        "Give way"
                    ],
                    "type": "string",
                    "fieldType": "selectlist",
                    "displayType": "select",
                    "isSearchable": false,
                    "propertyOrder": 8
                },
                "Surface condition": {
                    "enum": [
                        "Dry", "Wet", "Muddy", "Flooded"
                    ],
                    "type": "string",
                    "fieldType": "selectlist",
                    "displayType": "select",
                    "isSearchable": false,
                    "propertyOrder": 11
                },
                "Num driver casualties": {
                    "type": "string",
                    "format": "number",
                    "fieldType": "text",
                    "isSearchable": true,
                    "propertyOrder": 4
                },
                "Num passenger casualties": {
                    "type": "string",
                    "format": "number",
                    "fieldType": "text",
                    "isSearchable": false,
                    "propertyOrder": 6
                },
                "Num pedestrian casualties": {
                    "type": "string",
                    "format": "number",
                    "fieldType": "text",
                    "isSearchable": false,
                    "propertyOrder": 7
                }
            },
            "definitions": {},
            "description": "Details for Accident",
            "plural_title": "Accident Details",
            "propertyOrder": 0
        }
    },
    "description": "",
    "plural_title": ""
};

// optional
export const startval = {
    "photo": [],
    "person": [],
    "vehicle": [],
    "accidentDetails": {
        "Severity": "Fatal",
        "_localId": "162d62fe-46ee-468e-88cf-c827c8a05247",
        "Main cause": "Vehicle defect",
        "Description": "",
        "Num vehicles": "",
        "Surface type": "Concrete",
        "Street lights": "Lit",
        "Collision type": "Head on",
        "Traffic control": "None",
        "Surface condition": "Dry",
        "Num driver casualties": "",
        "Num passenger casualties": "",
        "Num pedestrian casualties": ""
    }
}