import PropTypes from 'prop-types'
import React from 'react'
import CSSModules from 'browser/lib/CSSModules'
import styles from './RevertModal.styl'
import dataApi from 'browser/main/lib/dataApi'
import store from 'browser/main/store'
import consts from 'browser/lib/consts'
import ModalEscButton from 'browser/components/ModalEscButton'
import AwsMobileAnalyticsConfig from 'browser/main/lib/AwsMobileAnalyticsConfig'
import i18n from 'browser/lib/i18n'

class RevertModal extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      name: '',
      rev: 'none'
    }
  }

  componentDidMount () {
    this.refs.name.focus()
    this.refs.name.select()
  }

  handleCloseButtonClick (e) {
    this.props.close()
  }

  handleKeyDown (e) {
    if (e.keyCode === 27) {
      this.props.close()
    }
  }

  handleInputKeyDown (e) {
    switch (e.keyCode) {
      case 13:
        this.confirm()
    }
  }

  handleConfirmButtonClick (e) {
      this.confirm()
  }

  handleSelectChange(e){
      this.setState({
        rev: this.refs.rev.value
      })
  }


  confirm () {
      console.log("Clicked OK")
      console.log(this.state.rev)
  }

  getRevisions(){
      var data = [
          {value:'Commit-value1', key:"commit-key1",name:"commit-nam1"},
          {value:'Commit-value2', key:"commit-key2",name:"commit-nam2"},
          {value:'Commit-value3', key:"commit-key3",name:"commit-nam3"},
          {value:'Commit-value4', key:"commit-key4",name:"commit-nam4"},
          {value:'Commit-value5', key:"commit-key5",name:"commit-nam5"},
          {value:'Commit-value6', key:"commit-key6",name:"commit-nam6"}
      ]
      return data
  }

  render () {
    return (
      <div styleName='root'
        tabIndex='-1'
        onKeyDown={(e) => this.handleKeyDown(e)}
      >
        <div styleName='header'>
          <div styleName='title'>{i18n.__('Revert')}</div>
        </div>
        <ModalEscButton handleEscButtonClick={(e) => this.handleCloseButtonClick(e)} />
        <div styleName='control'>
          <div styleName='control-folder'>
            <div styleName='control-folder-label'>{i18n.__('Select Revision')}</div>
            <select multiple styleName='control-folder-input' ref='rev' value={this.state.rev} onChange={(e) => this.handleSelectChange(e)}>
            {
              this.getRevisions().map((x) => <option value={x.value} key={x.key}>{x.name}</option>)
            }
            </select>
          </div>
          <button styleName='control-confirmButton'
            onClick={(e) => this.handleConfirmButtonClick(e)}
          >
            {i18n.__('Ok')}
          </button>
        </div>
      </div>
    )
  }
}

RevertModal.propTypes = {
  storage: PropTypes.shape({
    key: PropTypes.string
  })
}

export default CSSModules(RevertModal, styles)
