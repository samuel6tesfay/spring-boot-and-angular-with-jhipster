import { element, by, ElementFinder } from 'protractor';

export class PatientportalComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-patientportal div table .btn-danger'));
  title = element.all(by.css('jhi-patientportal div h2#page-heading span')).first();
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

export class PatientportalUpdatePage {
  pageTitle = element(by.id('jhi-patientportal-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  reasonInput = element(by.id('field_reason'));
  insuranceChangeInput = element(by.id('field_insuranceChange'));
  phoneNumberInput = element(by.id('field_phoneNumber'));

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

  async setInsuranceChangeInput(insuranceChange: string): Promise<void> {
    await this.insuranceChangeInput.sendKeys(insuranceChange);
  }

  async getInsuranceChangeInput(): Promise<string> {
    return await this.insuranceChangeInput.getAttribute('value');
  }

  async setPhoneNumberInput(phoneNumber: string): Promise<void> {
    await this.phoneNumberInput.sendKeys(phoneNumber);
  }

  async getPhoneNumberInput(): Promise<string> {
    return await this.phoneNumberInput.getAttribute('value');
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

export class PatientportalDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-patientportal-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-patientportal'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
