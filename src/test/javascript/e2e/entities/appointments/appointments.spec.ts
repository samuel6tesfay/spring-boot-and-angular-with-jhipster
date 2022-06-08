import { browser, ExpectedConditions as ec /* , promise */ } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  AppointmentsComponentsPage,
  /* AppointmentsDeleteDialog, */
  AppointmentsUpdatePage,
} from './appointments.page-object';

const expect = chai.expect;

describe('Appointments e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let appointmentsComponentsPage: AppointmentsComponentsPage;
  let appointmentsUpdatePage: AppointmentsUpdatePage;
  /* let appointmentsDeleteDialog: AppointmentsDeleteDialog; */
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Appointments', async () => {
    await navBarPage.goToEntity('appointments');
    appointmentsComponentsPage = new AppointmentsComponentsPage();
    await browser.wait(ec.visibilityOf(appointmentsComponentsPage.title), 5000);
    expect(await appointmentsComponentsPage.getTitle()).to.eq('Appointments');
    await browser.wait(
      ec.or(ec.visibilityOf(appointmentsComponentsPage.entities), ec.visibilityOf(appointmentsComponentsPage.noResult)),
      1000
    );
  });

  it('should load create Appointments page', async () => {
    await appointmentsComponentsPage.clickOnCreateButton();
    appointmentsUpdatePage = new AppointmentsUpdatePage();
    expect(await appointmentsUpdatePage.getPageTitle()).to.eq('Create or edit a Appointments');
    await appointmentsUpdatePage.cancel();
  });

  /* it('should create and save Appointments', async () => {
        const nbButtonsBeforeCreate = await appointmentsComponentsPage.countDeleteButtons();

        await appointmentsComponentsPage.clickOnCreateButton();

        await promise.all([
            appointmentsUpdatePage.setReasonInput('reason'),
            appointmentsUpdatePage.setInsuranceCompanyInput('insuranceCompany'),
            appointmentsUpdatePage.setPhoneNumberInput('phoneNumber'),
            appointmentsUpdatePage.ownerSelectLastOption(),
        ]);

        await appointmentsUpdatePage.save();
        expect(await appointmentsUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await appointmentsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /* it('should delete last Appointments', async () => {
        const nbButtonsBeforeDelete = await appointmentsComponentsPage.countDeleteButtons();
        await appointmentsComponentsPage.clickOnLastDeleteButton();

        appointmentsDeleteDialog = new AppointmentsDeleteDialog();
        expect(await appointmentsDeleteDialog.getDialogTitle())
            .to.eq('Are you sure you want to delete this Appointments?');
        await appointmentsDeleteDialog.clickOnConfirmButton();
        await browser.wait(ec.visibilityOf(appointmentsComponentsPage.title), 5000);

        expect(await appointmentsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
