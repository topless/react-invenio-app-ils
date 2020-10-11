import { checkoutItem } from '../../ItemsCheckout/state/actions';
import { connect } from 'react-redux';
import ItemsResultsListComponent from './ItemsResultsList';

const mapStateToProps = state => ({
  isLoading: state.patronItemsSearch.isLoading,
  checkoutData: state.patronItemsCheckout.data,
  checkoutIsLoading: state.patronItemsCheckout.isLoading,
  checkoutHasError: state.patronItemsCheckout.hasError,
  executedSearch: state.itemsSearchInput.executedSearch,
  results: state.itemsSearchInput.data,
});

const mapDispatchToProps = dispatch => ({
  checkoutItem: (documentPid, itemPid, patronPid, force = false) =>
    dispatch(checkoutItem(documentPid, itemPid, patronPid, force)),
});

export const ItemsResultsList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemsResultsListComponent);
