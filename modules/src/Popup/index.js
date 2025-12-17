import React from "react";
import { selectFormModelDefaultStyle } from "../../style/defaultStyle.js";

import { selectFormModelDynamicStyle } from "../../style/customeStyle.js";
import { Dialog } from "@rneui/themed";

const Popup = ({
    isShow,
    onBackdrop,
    children,
    customStyle,
    statusBarTranslucent,
}) => {
    return (
        <>
            <Dialog
                isVisible={isShow}
                onBackdropPress={() => {
                    onBackdrop && onBackdrop();
                }}
                animationType="fade"
                backdropStyle={{
                    backgroundColor: "rgba(0,0,0,0.7)",
                }}
                overlayStyle={{
                    ...selectFormModelDefaultStyle,
                    ...selectFormModelDynamicStyle,
                    ...customStyle,
                }}
                statusBarTranslucent={statusBarTranslucent}
            >
                {children}
            </Dialog>
        </>
    );
};

export default Popup;
