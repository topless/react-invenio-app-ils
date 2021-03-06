import { CopyButton } from '@components/CopyButton';
import { EmailLink } from '@components/EmailLink';
import { ResultsTable } from '@components/ResultsTable/ResultsTable';
import { invenioConfig } from '@config';
import { BackOfficeRoutes } from '@routes/backoffice/backofficeUrls';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const ViewDetails = ({ row }) => {
  // NOTE: patrons have id in their metadata not pid.
  return (
    <Link
      as={Link}
      to={BackOfficeRoutes.patronDetailsFor(row.metadata.id)}
      icon="info"
      data-test={row.metadata.pid}
    >
      {row.metadata.name}
    </Link>
  );
};

ViewDetails.propTypes = {
  row: PropTypes.object.isRequired,
};

const MailTo = ({ row }) => {
  const emailBody = `${row.metadata.name}, ${invenioConfig.APP.EMAILS_PREFILL.footer}`;

  return (
    <>
      <EmailLink email={row.metadata.email} body={emailBody} />{' '}
      <CopyButton text={row.metadata.email} />
    </>
  );
};

MailTo.propTypes = {
  row: PropTypes.object.isRequired,
};

export const PatronResultsList = ({ results, renderEmptyResultsElement }) => {
  const columns = [
    { title: 'Name', field: 'metadata.name', formatter: ViewDetails },
    { title: 'E-mail', field: 'metadata.email', formatter: MailTo },
    { title: '#ID', field: 'metadata.id' },
  ];

  return (
    <ResultsTable
      data={results}
      columns={columns}
      renderEmptyResultsElement={renderEmptyResultsElement}
      title=""
    />
  );
};

PatronResultsList.propTypes = {
  results: PropTypes.array.isRequired,
  renderEmptyResultsElement: PropTypes.func,
};

PatronResultsList.defaultProps = {
  renderEmptyResultsElement: null,
};
