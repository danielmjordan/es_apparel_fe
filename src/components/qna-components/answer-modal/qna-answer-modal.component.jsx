/* eslint-disable prefer-destructuring */
/* eslint-disable no-restricted-syntax */
import React from 'react';
import propTypes from 'prop-types';
import './qna-answer-modal.styles.scss';

class AnswerModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
      name: '',
      email: '',
    };
  }

  componentDidMount() {
    const { id } = this.props;
    fetch(`http://3.134.102.30/products/${id}`)
      .then((results) => results.json())
      .then((data) => this.setState({ name: data.name }));
  }

  addAnswer = (e) => {
    e.persist();
    e.preventDefault();
    const { body, name, email } = this.state;
    if (body && name && email) {
      const { questionId, showAddedAnswer, showAddAnswerModal } = this.props;
      const form = document.querySelector('.qna-new-answer-form');
      const formData = new FormData(form);
      const data = {};
      const imageUrls = [];

      for (const pair of formData.entries()) {
        if (pair[0].substr(0, 3) === 'url' && pair[1]) {
          imageUrls.push(pair[1]);
        } else if (pair[0].substr(0, 3) !== 'url') {
          data[pair[0]] = pair[1];
        }
      }

      data.photos = imageUrls;

      fetch(`http://3.134.102.30/qa/${questionId}/answers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(() => showAddedAnswer(questionId))
        .then(() => showAddAnswerModal(e));
    }
  }

  handleFormChanges = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { questionBody, showAddAnswerModal } = this.props;
    const { name } = this.state;
    return (
      <div className="qna-answer-modal">
        <div className="qna-answer-modal-content">
          <form className="qna-new-answer-form" name="answerForm">
            <div className="qna-answer-title">
              Submit your Answer
            </div>
            <div>
              <div className="answerTitle">
                {name}
                <span> : </span>
                {questionBody}
              </div>
              <div>
                <p>Your Answer*</p>
                <textarea required className="qna-answer-body" name="body" maxLength="1000" onChange={this.handleFormChanges} />
                <p>Nickname*</p>
                <input required type="text" className="qna-answer-email" name="name" maxLength="60" placeholder="Example: jack543!" onChange={this.handleFormChanges} />
                <br />
                For privacy reasons, do not use your full name or email address
                <p>Email*</p>
                <input required type="email" className="qna-answer-email" name="email" maxLength="60" placeholder="Example: jack@email.com" onChange={this.handleFormChanges} />
                <br />
                For authentication reasons, you will not be emailed
                <div className="qna-answer-image-urls">
                  <p>Add urls to your supporting images</p>
                  <input className="qna-answer-url" name="url1" type="url" />
                  <br />
                  <input className="qna-answer-url" name="url2" type="url" />
                  <br />
                  <input className="qna-answer-url" name="url3" type="url" />
                  <br />
                  <input className="qna-answer-url" name="url4" type="url" />
                  <br />
                  <input className="qna-answer-url" name="url5" type="url" />
                  <br />
                </div>
              </div>
            </div>
            <div className="qna-answer-button-container">
              <button className="main-button" type="submit" onClick={(e) => showAddAnswerModal(e)}>Cancel</button>
              <button className="main-button" type="submit" onClick={(e) => this.addAnswer(e)}>Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
AnswerModal.propTypes = {
  id: propTypes.string.isRequired,
  questionId: propTypes.number.isRequired,
  questionBody: propTypes.string.isRequired,
  showAddAnswerModal: propTypes.func.isRequired,
  showAddedAnswer: propTypes.func.isRequired,
};

export default AnswerModal;
