import * as React from "react";
import { IViewerProps } from "./IViewer";

import Viewer from 'react-viewer';
import { ImageDecorator } from "react-viewer/lib/ViewerProps";

export default function Page(props: IViewerProps) {
    const { viewer } = props;
    const [ visible, setVisible ] = React.useState(false);

    return <div>
            <img src={ viewer.path }
                onClick={()=> { setVisible(true); } }
                className={ viewer.className.join(" ") }
            />
            <Viewer
                visible={visible}
                onClose={() => { setVisible(false); } }
                images={ viewer.items as ImageDecorator[] }
                />
        </div>;
}