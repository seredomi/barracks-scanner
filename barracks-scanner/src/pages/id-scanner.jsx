import React from 'react';
import { useState } from 'react';
import { FlexGrid, Row, Column, Button, Tile, ComposedModal } from '@carbon/react';
import { Check, Info, AlertTriangle } from 'lucide-react';


function Indicator(props) {
    
    const handleStatusClick = () => { props.setReady(true); }

    if (props.ready) {
        return (
            <Button kind='tertiary' disabled>
                <div style={{display:'flex'}}>
                    <Check size='20'/>
                    <p>&nbsp;&nbsp;&nbsp;Scan back of ID when ready</p>
                </div>
            </Button>
        )
    }
    else {
        return (
            <Button kind='danger' onClick={handleStatusClick}>
                <div style={{display:'flex'}}>
                    <AlertTriangle size='20' />
                    <p>&nbsp;&nbsp;&nbsp;Click here before scanning!</p>
                </div>
            </Button>
        )
    }
}

export default function IdScannerPage() {
    const [id, setId] = useState('');
    const [ready, setReady] = useState(false);

    const readyProps = { ready, setReady };

    return (
        <FlexGrid>
            <Row>
                <Column>
                    <h2>ID Scanner</h2>
                    <br/> <br/>
                    <Indicator {...readyProps} />
                </Column>
            </Row>
        </FlexGrid>
    )
}