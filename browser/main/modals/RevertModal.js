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

import ngit from 'nodegit';


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

     // var Git = require("nodegit");
/*
      Git.Clone("https://github.com/nodegit/nodegit", "./tmp")
  // Look up this known commit.
  .then(function(repo) {
    // Use a known commit sha from this repository.
    return repo.getCommit("59b20b8d5c6ff8d09518454d4dd8b7b30f095ab5");
  })
  // Look up a specific file within that commit.
  .then(function(commit) {
    return commit.getEntry("README.md");
  })
  // Get the blob contents from the file.
  .then(function(entry) {
    // Patch the blob to contain a reference to the entry.
    return entry.getBlob().then(function(blob) {
      blob.entry = entry;
      return blob;
    });
  })
  // Display information about the blob.
  .then(function(blob) {
    // Show the path, sha, and filesize in bytes.
    console.log(blob.entry.path() + blob.entry.sha() + blob.rawsize() + "b");

    // Show a spacer.
    console.log(Array(72).join("=") + "\n\n");

    // Show the entire file.
    console.log(String(blob));
  })
  .catch(function(err) { console.log(err); });
*/


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
