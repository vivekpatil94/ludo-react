import React from 'react'

import { Box, Checkbox, Chip, FormControl, FormControlLabel, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material'
import StyledModal from '../../components/StyledModal'

const AddEditModal = (props) => {

    const handleModalClose = () => {
        props.SetModalOpen(false);
    }

    const onChangeHiddenName = (event) => {
        props.SetHiddenName(event.target.value);
    }

    const onChangeDisplayName = (event) => {
        props.SetDisplayName(event.target.value);
    }

    const onChangeVisibility = () => {
        props.SetVisibility(!props.visibility);
    }

    const onChangeBundle = (bundle) => {
        props.SetBundle(bundle);
    }

    const onChangeCategory = (event) => {
        props.SetCategories(event.target.value);
    }

    const onDeselectCategory = (categoryId) => {
        var _categories = props.categories;
        var index = _categories.indexOf(categoryId);

        if (index === -1)
            return;

        _categories.splice(index, 1);
        props.SetCategories(_categories);
        props.ForceRender();
    }

    const onChangeKeywords = (event) => {
        props.SetKeywords(event.target.value);
    }

    const handleSave = () => {
        if (props.selectedOption === "new")
            props.handleCreateGame();

        if (props.selectedOption === "edit")
            props.handleEditGame();
    }

    return (
        <StyledModal isModalOpen={props.isModalOpen} modalTitle={props.modalTitle} handleModalClose={handleModalClose} handleSave={handleSave}>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: "25px"
            }}>
                <TextField label="Hidden Name" type="text" value={props.gameHiddenName} onChange={onChangeHiddenName} sx={{ width: "80%", mt: "20px" }} />
                <TextField label="Display Name" type="text" value={props.gameDisplayName} onChange={onChangeDisplayName} sx={{ width: "80%", mt: "20px" }} />
                <Box sx={{ width: "80%", mt: "20px" }}>
                    <FormControl fullWidth>
                        <InputLabel id="bundle-label">Bundle</InputLabel>
                        <Select
                            labelId="bundle-label"
                            id="bundle-select"
                            value={props.bundle.id}
                            label="Bundle"
                        >
                            {
                                props.allBundles.map((bundle) => {
                                    return (
                                        <MenuItem key={bundle.id} value={bundle.id} onClick={() => onChangeBundle(bundle)}>{bundle.name}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ width: "80%", mt: "20px" }}>
                    <FormControl fullWidth>
                        <InputLabel id="categories-label">Categories</InputLabel>
                        <Select
                            labelId="categories-label"
                            id="categories"
                            multiple
                            value={props.categories}
                            onChange={onChangeCategory}
                            input={<OutlinedInput id="select-multiple-chip" label="Categories" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => {
                                        var _category = props.allCategories.find((x) => { return x.id === value });
                                        if (_category) {
                                            return (
                                                <Chip key={_category.id} label={_category.name} onMouseDown={(event) => { event.stopPropagation(); }} onDelete={() => onDeselectCategory(_category.id)} />
                                            )
                                        }
                                        return ([])
                                    })}
                                </Box>
                            )}
                        >
                            {props.allCategories.map((category) => {
                                return (
                                    <MenuItem
                                        key={category.id}
                                        value={category.id}
                                        sx={{
                                            display: props.categories.find((x) => x === category.id) ? "none" : "block"
                                        }}
                                    >
                                        {category.name}
                                    </MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                </Box>
                <TextField label="Keywords (csv)" type="text" value={props.keywords} onChange={onChangeKeywords} sx={{ width: "80%", mt: "20px" }} />
                <Box sx={{ width: "80%", mt: "20px" }}>
                    <FormControlLabel
                        label="Visibility"
                        control={
                            <Checkbox
                                onChange={onChangeVisibility}
                                checked={props.visibility}
                            />
                        }
                        sx={{
                            color: props.theme.palette.text.primary,
                        }}
                    />
                </Box>
            </Box>
        </StyledModal >
    )
}

export default AddEditModal