// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import RatingTable from '../../sections/@dashboard/rating/ratingtable';


// ----------------------------------------------------------------------

export default function Rating() {
    const { themeStretch } = useSettings();

    return (
        <Page title="">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading="Buy license"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Packages', href: PATH_DASHBOARD.blog.root },
                    ]}
                />

               <RatingTable />
            </Container>
        </Page>
    );
}
