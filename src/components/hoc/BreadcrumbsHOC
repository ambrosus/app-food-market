import { connect } from 'react-redux';
import Breadcrumbs from '../stateless/specific/navigation/Breadcrumbs/Breadcrumbs';

const selectBreadcrumbs = (pages, location) => {
  let page;
  let breadcrumbs = [];
  while (pages[location]) {
    page = pages[location];
    page.to = location;
    breadcrumbs = [page, ...breadcrumbs];
    location = page.parent;
  }

  return breadcrumbs;
};

const mapStateToProps = (state, ownProps) => ({
  breadcrumbs: selectBreadcrumbs(state.breadcrumbs, ownProps.location),
});

export default connect(mapStateToProps)(Breadcrumbs);
