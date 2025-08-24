import { useTranslation } from 'react-i18next';
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"

import { selectActiveChannel } from "../../slices/activeChannelSlice"
import { setActive } from "../../slices/activeChannelSlice"

const Channel = ({channel}) => {
  const dispatch = useDispatch()
  const activeChannel = useSelector(selectActiveChannel)
  const {t} = useTranslation();
  const { id, name, removable} = channel;

  console.log(activeChannel)

  const handleChannelChange = () => {
    dispatch(setActive(channel))
  }

  const classForChannels = activeChannel?.id === id ? 'w-100 rounded-0 text-start btn btn-secondary' : 'w-100 rounded-0 text-start btn';

  if (removable) {
    return (
    <li className="nav-item w-100" key={id} onClick={handleChannelChange}>
      <div role="group" className="d-flex dropdown btn-group">
        <button type="button" className={classForChannels}>
          <span className="me-1">#</span>{name}</button>
        <button type="button" id="react-aria6719421468-:r1:" aria-expanded="false" className="flex-grow-0 dropdown-toggle dropdown-toggle-split btn btn-secondary">
          <span className="visually-hidden">{t('channel.channelControl')}</span>
        </button>
      </div>
    </li>
    )
  }
  return (
    <li className="nav-item w-100" key={id} onClick={handleChannelChange}>
      <button type="button" className={classForChannels}>
        <span className="me-1">#</span>{name}</button>
    </li>
  )
}

export default Channel