import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PatientportalComponentsPage, PatientportalDeleteDialog, PatientportalUpdatePage } from './patientportal.page-object';

const expect = chai.expect;

describe('Patientportal e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let patientportalComponentsPage: PatientportalComponentsPage;
  let patientportalUpdatePage: PatientportalUpdatePage;
  let patientportalDeleteDialog: PatientportalDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Patientportals', async () => {
    await navBarPage.goToEntity('patientportal');
    patientportalComponentsPage = new PatientportalComponentsPage();
    await browser.wait(ec.visibilityOf(patientportalComponentsPage.title), 5000);
    expect(await patientportalComponentsPage.getTitle()).to.eq('Patientportals');
    await browser.wait(
      ec.or(ec.visibilityOf(patientportalComponentsPage.entities), ec.visibilityOf(patientportalComponentsPage.noResult)),
      1000
    );
  });

  it('should load create Patientportal page', async () => {
    await patientportalComponentsPage.clickOnCreateButton();
    patientportalUpdatePage = new PatientportalUpdatePage();
    expect(await patientportalUpdatePage.getPageTitle()).to.eq('Create or edit a Patientportal');
    await patientportalUpdatePage.cancel();
  });

  it('should create and save Patientportals', async () => {
    const nbButtonsBeforeCreate = await patientportalComponentsPage.countDeleteButtons();

    await patientportalComponentsPage.clickOnCreateButton();

    await promise.all([
      patientportalUpdatePage.setReasonInput('reason'),
      patientportalUpdatePage.setInsuranceChangeInput('insuranceChange'),
      patientportalUpdatePage.setPhoneNumberInput('5'),
    ]);

    await patientportalUpdatePage.save();
    expect(await patientportalUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await patientportalComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Patientportal', async () => {
    const nbButtonsBeforeDelete = await patientportalComponentsPage.countDeleteButtons();
    await patientportalComponentsPage.clickOnLastDeleteButton();

    patientportalDeleteDialog = new PatientportalDeleteDialog();
    expect(await patientportalDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Patientportal?');
    await patientportalDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(patientportalComponentsPage.title), 5000);

    expect(await patientportalComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
