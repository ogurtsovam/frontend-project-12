import { Dropdown, ButtonGroup  } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import DeleteChannelModal from '../modals/DeleteChannelModal';
import RenameChannelModal from '../modals/RenameChannelModal';

const ChannelMenu = ({classForButtons, modals, channel }) => {
  const {t} = useTranslation()

  const { showRename, updateShowRename, showRemove, updateShowRemove } = modals;
  return (
  <Dropdown as={ButtonGroup} className="flex-grow-0" align="end">
    <Dropdown.Toggle split variant="" id="dropdown-split-basic" aria-expanded="false" className={classForButtons}>
      <span className="visually-hidden">{t('channels.channelControl')}</span>
    </Dropdown.Toggle>

    <Dropdown.Menu>
      <Dropdown.Item tabIndex="0" onClick={()=> updateShowRename(true)} href="#">{t('modals.rename')}</Dropdown.Item>
      <RenameChannelModal show={showRename} updateShowRename={()=> updateShowRename(false)} channel={channel} />
      <Dropdown.Item tabIndex="0" onClick={()=> updateShowRemove(true)} href="#">{t('modals.delete')}</Dropdown.Item>
      <DeleteChannelModal show={showRemove} updateShowRemove={()=> updateShowRemove(false)} channel={channel} />
    </Dropdown.Menu>
  </Dropdown>
  )
};

export default ChannelMenu;