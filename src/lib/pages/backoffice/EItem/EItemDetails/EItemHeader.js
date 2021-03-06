import { toShortDate } from '@api/date';
import { DetailsHeader } from '@components/backoffice/DetailsHeader';
import { DocumentIcon, EItemIcon } from '@components/backoffice/icons';
import { OpenAccessLabel } from '@components/backoffice/OpenAccessLabel';
import { CopyButton } from '@components/CopyButton';
import DocumentAuthors from '@modules/Document/DocumentAuthors';
import LiteratureTitle from '@modules/Literature/LiteratureTitle';
import { BackOfficeRoutes } from '@routes/urls';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';

export class EItemHeader extends Component {
  render() {
    const { data } = this.props;
    const recordInfo = (
      <>
        <label className="muted">Electronic copy</label> {data.metadata.pid}{' '}
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
        <br />
        <OpenAccessLabel openAccess={data.metadata.open_access} />
      </>
    );
    return (
      <DetailsHeader
        title={
          <>
            {data.metadata.pid}:{' '}
            <LiteratureTitle
              title={data.metadata.document.title}
              edition={data.metadata.document.edition}
              publicationYear={data.metadata.document.publication_year}
              showOnlyTitle
              truncate
            />
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
        icon={<EItemIcon />}
        recordInfo={recordInfo}
      />
    );
  }
}

EItemHeader.propTypes = {
  data: PropTypes.object.isRequired,
};
