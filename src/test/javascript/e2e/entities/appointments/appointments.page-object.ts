import { element, by, ElementFinder } from 'protractor';

export class AppointmentsComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-appointments div table .btn-danger'));
  title = element.all(by.css('jhi-appointments div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getText();
  }
}

export class AppointmentsUpdatePage {
  pageTitle = element(by.id('jhi-appointments-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  reasonInput = element(by.id('field_reason'));
  insuranceCompanyInput = element(by.id('field_insuranceCompany'));
  phoneNumberInput = element(by.id('field_phoneNumber'));

  ownerSelect = element(by.id('field_owner'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setReasonInput(reason: string): Promise<void> {
    await this.reasonInput.sendKeys(reason);
  }

  async getReasonInput(): Promise<string> {
    return await this.reasonInput.getAttribute('value');
  }

  async setInsuranceCompanyInput(insuranceCompany: string): Promise<void> {
    await this.insuranceCompanyInput.sendKeys(insuranceCompany);
  }

  async getInsuranceCompanyInput(): Promise<string> {
    return await this.insuranceCompanyInput.getAttribute('value');
  }

  async setPhoneNumberInput(phoneNumber: string): Promise<void> {
    await this.phoneNumberInput.sendKeys(phoneNumber);
  }

  async getPhoneNumberInput(): Promise<string> {
    return await this.phoneNumberInput.getAttribute('value');
  }

  async ownerSelectLastOption(): Promise<void> {
    await this.ownerSelect.all(by.tagName('option')).last().click();
  }

  async ownerSelectOption(option: string): Promise<void> {
    await this.ownerSelect.sendKeys(option);
  }

  getOwnerSelect(): ElementFinder {
    return this.ownerSelect;
  }

  async getOwnerSelectedOption(): Promise<string> {
    return await this.ownerSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class AppointmentsDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-appointments-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-appointments'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
