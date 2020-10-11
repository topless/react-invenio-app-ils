import { recordToPidType } from '@api/utils';
import { Loader } from '@components/Loader';
import { ResultsTable } from '@components/ResultsTable/ResultsTable';
import { invenioConfig } from '@config';
import { BackOfficeRoutes } from '@routes/urls';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Icon, Modal, Message, Popup } from 'semantic-ui-react';
import _isEmpty from 'lodash/isEmpty';

export default class ItemsResultsList extends Component {
  state = { isModalOpen: false };

  toggleModal = () => {
    const { isModalOpen } = this.state;
    this.setState({ isModalOpen: !isModalOpen });
  };

  onClickCheckoutHandler = async (
    documentPid,
    itemPid,
    patronPid,
    force = false
  ) => {
    const { checkoutItem } = this.props;
    checkoutItem(documentPid, itemPid, patronPid, force);
  };

  actions = ({ row }) => {
    const { patronPid } = this.props;
    const buttonCheckout = (
      <Button
        content="Check out"
        onClick={() => {
          const itemPid = {
            type: recordToPidType(row),
            value: row.metadata.pid,
          };
          this.onClickCheckoutHandler(
            row.metadata.document_pid,
            itemPid,
            patronPid,
            false
          );
        }}
      />
    );

    const circulationStatus = !_isEmpty(row.metadata.circulation)
      ? row.metadata.circulation.state
      : null;

    return !invenioConfig.CIRCULATION.loanActiveStates.includes(
      circulationStatus
    ) && invenioConfig.ITEMS.canCirculateStatuses.includes(row.metadata.status)
      ? buttonCheckout
      : this.renderForceCheckoutModal(
          row,
          invenioConfig.CIRCULATION.loanActiveStates.includes(circulationStatus)
        );
  };

  renderForceCheckoutModal = (item, isItemOnLoan) => {
    const { isModalOpen } = this.state;
    const { patronPid } = this.props;
    const itemPid = {
      type: recordToPidType(item),
      value: item.metadata.pid,
    };

    return (
      <>
        <Modal
          trigger={
            <Button
              color="yellow"
              onClick={this.toggleModal}
              disabled={isItemOnLoan}
            >
              Force Checkout
            </Button>
          }
          open={isModalOpen}
          onClose={this.toggleModal}
          closeIcon
        >
          <Header
            icon="exclamation triangle"
            content="Force Check out of Missing Item"
          />
          <Modal.Content>
            <p>
              You are creating a loan for a physical copy that cannot circulate.
              Are you sure?
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button color="red" onClick={this.toggleModal}>
              <Icon name="remove" /> No
            </Button>
            <Button
              color="green"
              onClick={() =>
                this.onClickCheckoutHandler(
                  item.metadata.document_pid,
                  itemPid,
                  patronPid,
                  true
                )
              }
            >
              <Icon name="checkmark" /> Yes
            </Button>
          </Modal.Actions>
        </Modal>
        {isItemOnLoan && (
          <Popup
            content="Physical copy is already on loan. To check out this copy, first cancel the current loan."
            trigger={
              <Icon name="question circle" color="yellow" size="large" />
            }
          />
        )}
      </>
    );
  };

  viewDetails = ({ row }) => {
    return (
      <Link
        to={BackOfficeRoutes.itemDetailsFor(row.metadata.pid)}
        data-test={row.metadata.pid}
      >
        {row.metadata.barcode}
      </Link>
    );
  };

  render() {
    const {
      results,
      checkoutIsLoading,
      executedSearch,
      isLoading,
    } = this.props;
    const columns = [
      {
        title: 'Barcode',
        field: 'metadata.barcode',
        formatter: this.viewDetails,
      },
      { title: 'Status', field: 'metadata.status' },
      { title: 'Medium', field: 'metadata.medium' },
      { title: 'Circulation status', field: 'metadata.circulation.state' },
      {
        title: 'Actions',
        field: '',
        formatter: this.actions,
      },
    ];

    return isLoading && executedSearch ? (
      <Loader isLoading={isLoading} />
    ) : !_isEmpty(results.hits) ? (
      <Loader isLoading={checkoutIsLoading}>
        <p>Found {results.hits.length} item(s).</p>
        <ResultsTable
          data={results.hits}
          columns={columns}
          totalHitsCount={results.length}
          name="items"
        />
      </Loader>
    ) : executedSearch ? (
      <Message
        error
        header="Found no physical copies for this barcode."
        content="Please try again"
      />
    ) : null;
  }
}

ItemsResultsList.propTypes = {
  results: PropTypes.object.isRequired,
  checkoutItem: PropTypes.func.isRequired,
  patronPid: PropTypes.string.isRequired,
  checkoutIsLoading: PropTypes.bool,
  executedSearch: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

ItemsResultsList.defaultProps = {
  checkoutIsLoading: false,
};
