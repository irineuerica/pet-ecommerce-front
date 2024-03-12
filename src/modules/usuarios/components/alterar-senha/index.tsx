import { Stack } from "@mui/material";
import { FormInputText } from "src/components/FormInputText ";

export default function AlterarSenha(){

    return(
        <Stack spacing={3}>
            <FormInputText name='senha' type="password" label={'Nova senha'}/>
            <FormInputText name='confirmaSenha' type="password" label={'Confirme a nova senha'}/>
        </Stack>
    )
}