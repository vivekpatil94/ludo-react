import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Box, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { getGameParameters, getGameRooms } from '../../services/api';
import Parameters from './parameters/Parameters';
import Rooms from './rooms/Rooms';

const ParametersRooms = (props) => {

    const parameterColumns = [
        { id: "index", label: "Sr. No", minWidth: 100, align: "center" },
        { id: "hiddenName", label: "Hidden Name", minWidth: 100, align: "center" },
        { id: "displayName", label: "Display Name", minWidth: 100, align: "center" },
        { id: "dataType", label: "Data Type", minWidth: 100, align: "center" },
        { id: "defaultValue", label: "Default Value", minWidth: 100, align: "center" },
        { id: "visibility", label: "Visibility", minWidth: 100, align: "center" },
        { id: "isPlayInfo", label: "Play Info", minWidth: 100, align: "center" },
        { id: "dimension", label: "Dimensions", minWidth: 100, align: "center" },
        { id: "actions", label: "Actions", minWidth: 100, align: "center" }
    ]

    const staticRoomColumns_Start = useMemo(() => (
        [
            { id: "index", label: "Sr. No", minWidth: 100, align: "center" },
            { id: "name", label: "Name", minWidth: 100, align: "center" },
            { id: "visibility", label: "Visibility", minWidth: 100, align: "center" }
        ]
    ), []);

    const staticRoomColumns_End = useMemo(() => ([
        { id: "actions", label: "Actions", minWidth: 100, align: "center" }
    ]
    ), []);

    const [parameterRows, SetParameterRows] = useState([]);
    const [roomColumns, SetRoomColumns] = useState([]);
    const [roomDynamicColumns, SetRoomDynamicColumns] = useState([]);
    const [roomRows, SetRoomRows] = useState([]);

    const [pageName, SetPageName] = useState("rooms");

    // eslint-disable-next-line
    const [count, SetCount] = useState(0);

    const variation = useRef();

    const ForceRender = useCallback(() => {
        SetCount(c => c + 1);
    }, []);

    const navigateBack = () => {
        props.SetPageDetails({ index: 4, path: "/GameVariations" });
    }

    const TogglePage = (pageName) => {
        SetPageName(pageName);
    }

    const fetchParameters = async () => {
        var response = await getGameParameters(variation.current.id);

        if (response.status === 200) {
            if (response.data.status) {
                const _rows = [];

                response.data.parameters.map((parameter, index) => (
                    _rows.push
                        ({
                            index: index + 1,
                            data: parameter,
                            hiddenName: parameter.hiddenName,
                            displayName: parameter.displayName,
                            dataType: parameter.dataType,
                            defaultValue: parameter.defaultValue,
                            visibility: parameter.isVisible ? "Visible" : "Hidden",
                            isPlayInfo: parameter.isPlayInfo ? "Yes" : "No",
                            dimension: parameter.dimension,
                            actions: ["playInfo", "edit", "delete"]
                        })
                ));

                SetParameterRows(_rows);
            } else {
                props.showError(response.data.message);
            }
        } else {
            props.showError(response.data.message);
        }
    };

    const fetchRooms = useCallback(async () => {
        var response = await getGameRooms(variation.current.id);

        if (response.status === 200) {
            if (response.data.status) {
                const _dynamicColumns = [];
                const _columns = [];
                const _rows = [];

                let _rowIndexArr = [];
                let _rowValueArr = [];

                response.data.rooms.forEach((room, index) => {

                    _rowIndexArr.push("index");
                    _rowValueArr.push(index + 1);

                    _rowIndexArr.push("data");
                    _rowValueArr.push(room);

                    _rowIndexArr.push("visibility");
                    _rowValueArr.push(room.isVisible ? "Visible" : "Hidden");

                    _rowIndexArr.push("name");
                    _rowValueArr.push(room.name);

                    _rowIndexArr.push("actions");
                    _rowValueArr.push(["edit", "delete"]);

                    room.parameters.forEach((parameter) => {
                        _rowIndexArr.push(parameter.id);
                        _rowValueArr.push(parameter.value);
                    });

                    let data = {};
                    for (let i = 0; i < _rowIndexArr.length; i++) {
                        data[_rowIndexArr[i]] = _rowValueArr[i];
                    }

                    _rows.push(data);
                });

                staticRoomColumns_Start.forEach((column) => {
                    _columns.push(column);
                });

                parameterRows.forEach((parameter) => {
                    const column = {
                        id: parameter.data.id,
                        label: parameter.data.hiddenName,
                        defaultValue: parameter.data.defaultValue,
                        minWidth: 100,
                        align: "center"
                    };

                    _dynamicColumns.push(column);
                    _columns.push(column);
                });

                staticRoomColumns_End.forEach((column) => {
                    _columns.push(column);
                });

                SetRoomDynamicColumns(_dynamicColumns);
                SetRoomColumns(_columns);
                SetRoomRows(_rows);
                ForceRender();
            } else {
                props.showError(response.data.message);
            }
        } else {
            props.showError(response.data.message);
        }
    }, [props, staticRoomColumns_Start, staticRoomColumns_End, parameterRows, ForceRender]);

    useEffect(() => {
        props.SetPageDetails({ index: 4, path: "/ParametersRooms" });
        variation.current = JSON.parse(localStorage.getItem("cc_variation"));
        fetchParameters();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        fetchRooms();
    }, [fetchRooms, parameterRows])

    return (
        <Box
            sx={{
                bgcolor: "background.default",
                mt: "100px",
                display: "flex",
                flexDirection: "column"
            }}>
            <Box sx={{
                width: "90%",
                margin: "50px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "25px"
                }}>
                    <Button variant='contained' onClick={() => navigateBack()} sx={{
                        fontWeight: 600,
                        p: "10px",
                    }}>
                        <ArrowBackIcon sx={{ mr: "5px" }} />Back
                    </Button>
                </Box>
                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "25px"
                }}>
                    <Button variant='contained' onClick={() => TogglePage("parameters")} sx={{
                        fontWeight: 600,
                        p: "10px",
                    }}>
                        Parameters
                    </Button>
                    <Button variant='contained' onClick={() => TogglePage("rooms")} sx={{
                        fontWeight: 600,
                        p: "10px",
                    }}>
                        Rooms
                    </Button>
                </Box>
            </Box>
            {(pageName === "parameters") &&
                <Parameters
                    columns={parameterColumns}
                    rows={parameterRows}

                    variation={variation}

                    fetchData={fetchParameters}
                    ForceRender={ForceRender}

                    showError={props.showError}
                    showSuccess={props.showSuccess}
                />
            }
            {(pageName === "rooms") &&
                <Rooms
                    dynamicColumns={roomDynamicColumns}
                    columns={roomColumns}
                    rows={roomRows}

                    variation={variation}

                    fetchData={fetchRooms}
                    ForceRender={ForceRender}

                    showError={props.showError}
                    showSuccess={props.showSuccess}
                />
            }
        </Box >
    )
}

export default ParametersRooms