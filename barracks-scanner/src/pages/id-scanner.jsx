import React from 'react';
import { useEffect } from 'react';
import { FlexGrid, Row, Column, Button, Tile, ComposedModal } from '@carbon/react';
import { Check, AlertTriangle } from 'lucide-react';


function Indicator(props) {
    
    const handleStatusClick = () => { props.setStatus(true); }

    if (props.status) {
        return (
            <Button kind='tertiary' disabled>
                <div style={{display:'flex'}}>
                    <Check size='20'/>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Scan back of ID when ready</p>
                </div>
            </Button>
        )
    }
    else {
        return (
            <Button kind='danger' onClick={handleStatusClick}>
                <div style={{display:'flex'}}>
                    <AlertTriangle size='20' />
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Click here before scanning!</p>
                </div>
            </Button>
        )
    }
}

export function IdScannerPage(props) {

    const scanComplete = false;
    
    return (
        <FlexGrid>
            <Row>
                <Column>
                    <h2>ID Scanner</h2>
                    <br/> <br/>
                    <Indicator {...props} />
                </Column>
            </Row>
        </FlexGrid>
    )
}