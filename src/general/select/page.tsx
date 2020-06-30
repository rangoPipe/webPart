import * as React from "react";
import { ISelectProps } from "./ISelect";
import { Autocomplete } from "@material-ui/lab";
import { TextField } from "@material-ui/core";
import { ISelectItemProps } from "../../redux/reducers/general/select/ISelect";

export default function Page(props: ISelectProps) {
    const { select } = props;
    return (
        
        (select.hidden)
        ? null
        :
            <div>
                {
                    (!select.multiple)
                    ? <Autocomplete
                        id={ select.id }
                        disabled= {select.disabled }
                        options={ select.items }
                        onChange={ select.onChange }
                        getOptionLabel={(option) => option.text}
                        value= { (select.value as ISelectItemProps) }
                        renderInput={(params) => (
                            <TextField {...params} variant="outlined" label={ select.label } placeholder={ select.placeholder } margin="dense"/>
                        )}
                    />
                    :
                    <Autocomplete
                        id={ select.id }
                        multiple
                        disableCloseOnSelect = { select.disableCloseOnSelect }
                        disabled= {select.disabled }
                        options={ select.items }
                        onChange={ select.onChange }
                        getOptionLabel={(option) => option.text}
                        value= { (select.value as ISelectItemProps[]) }
                        renderInput={(params) => (
                            <TextField {...params} variant="outlined" label={ select.label } placeholder={ select.placeholder } margin="dense"/>
                        )}
                    />
                }
                
            </div>
    );
}