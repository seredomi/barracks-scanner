import { Theme } from '@carbon/react';
import { Header, HeaderName, HeaderGlobalBar, HeaderGlobalAction } from '@carbon/react';
import { appWindow } from '@tauri-apps/api/window';
import { Close } from '@carbon/icons-react'

const Title = () => {
  const buildingNo = '6872';
  return (
    <Theme theme='g90'>
      <Header aria-label='window title' data-tauri-drag-region className='window-title' >
          <HeaderName data-tauri-drag-region  prefix={buildingNo} >
              Barracks Personnel Identifier
          </HeaderName>
          <HeaderGlobalBar data-tauri-drag-region >
              <HeaderGlobalAction aria-label='Close' onClick={() => appWindow.close()}>
                  <Close size={20} />
              </HeaderGlobalAction>
          </HeaderGlobalBar>
      </Header>
    </Theme>
  )
}

export default Title;