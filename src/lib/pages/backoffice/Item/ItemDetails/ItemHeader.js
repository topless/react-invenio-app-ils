import { toShortDate } from '@api/date';
import { DetailsHeader } from '@components/backoffice/DetailsHeader';
import { DocumentIcon, ItemIcon } from '@components/backoffice/icons';
import { CopyButton } from '@components/CopyButton';
import DocumentAuthors from '@modules/Document/DocumentAuthors';
import LiteratureTitle from '@modules/Literature/LiteratureTitle';
import { BackOfficeRoutes } from '@routes/urls';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Header, Label } from 'semantic-ui-react';
import { invenioConfig } from '@config';
import { DateTime } from 'luxon';

export class ItemHeader extends Component {
  statusLabel = () => {
    const { data } = this.props;
    let status = { value: 'on-shelf', text: 'On shelf' };
    if (
      invenioConfig.ITEMS.canCirculateStatuses.includes(data.metadata.status)
    ) {
      if (
        invenioConfig.CIRCULATION.loanActiveStates.includes(
          data.metadata.circulation.state
        )
      ) {
        status = invenioConfig.CIRCULATION.statuses.find(
          x => x.value === data.metadata.circulation.state
        );
      }
    } else {
      status = invenioConfig.ITEMS.statuses.find(
        x => x.value === data.metadata.status
      );
    }
    const lowercaseDashed = value => {
      value = value.toLowerCase().replace(/_/g, '-');
      return value;
    };
    return (
      <Label className={`item-status-${lowercaseDashed(status.value)}`}>
        {status.text}
      </Label>
    );
  };

  render() {
    const { data } = this.props;
    const recordInfo = (
      <>
        <label className="muted">Physical copy</label> {data.metadata.pid}{' '}
        <CopyButton text={data.metadata.pid} />
        <br />
        <label className="muted">Created on</label>{' '}
        {toShortDate(DateTime.fromISO(data.created))}
        <br />
        <Link
          to={BackOfficeRoutes.documentDetailsFor(data.metadata.document_pid)}
        >
          see document <DocumentIcon />
        </Link>
      </>
    );
    return (
      <DetailsHeader
        title={
          <>
            <Header.Subheader>Medium: {data.metadata.medium}</Header.Subheader>
            {data.metadata.barcode}:{' '}
            <LiteratureTitle
              title={data.metadata.document.title}
              edition={data.metadata.document.edition}
              publicationYear={data.metadata.document.publication_year}
              showOnlyTitle
              truncate
            />
            {this.statusLabel()}
          </>
        }
        subTitle={
          <DocumentAuthors
            authors={data.metadata.document.authors}
            hasOtherAuthors={data.metadata.document.other_authors}
            prefix="by "
            limit={10}
          />
        }
        pid={data.metadata.pid}
        icon={<ItemIcon />}
        recordInfo={recordInfo}
      />
    );
  }
}

ItemHeader.propTypes = {
  data: PropTypes.object.isRequired,
};
