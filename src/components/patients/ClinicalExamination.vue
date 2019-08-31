<template>
	<div>
		<FieldsList :fields="fields" v-if="!loading"/>

		<div class="alert alert-success text-center w-50 mt-5 mx-auto" v-if="!fieldSelected && !loading">
			Επιλογή πεδίων
		</div>

		<form class="row col-12 mt-3" v-if="fieldSelected">

			<div class="col-lg-6 col-12">

				<div class="col-12 text-center">
					<h3>Εξωστοματική</h3>
				</div>

				<div class="card mb-2 col-12" v-if="haveFaceFields">

					<div class="card-header row">
						<span>Πρόσωπο</span>
					</div>

					<div class="card-body">

						<div class="input-group row mb-2" v-if="fields.edema.display">
							<div class="input-group-prepend">
								<div class="input-group-text">
									<label for="edema" class="my-auto">Οίδημα</label>
								</div>
							</div>

							<input id="edema" type="text" class="form-control"
								   v-model="clinicalExamination.edema" maxlength="20">
							<minus-circle-outline v-if="!clinicalExamination.edema"
												  class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
												  @click="removeField(fields.edema)"/>
							<form-error v-if="response.errors.edema"
										:error="response.errors.edema[0]"/>
						</div>

						<div class="input-group row mb-2" v-if="fields.asymmetry.display">
							<div class="input-group-prepend">
								<div class="input-group-text">
									<label for="asymmetry" class="my-auto">Ασυμετρία</label>
								</div>
							</div>

							<input id="asymmetry" type="text" class="form-control"
								   v-model="clinicalExamination.asymmetry" maxlength="20">
							<minus-circle-outline v-if="!clinicalExamination.asymmetry"
												  class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
												  @click="removeField(fields.asymmetry)"/>
							<form-error v-if="response.errors.asymmetry"
										:error="response.errors.asymmetry[0]"/>
						</div>

						<div class="input-group row mb-2" v-if="fields.swelling.display">
							<div class="input-group-prepend">
								<div class="input-group-text">
									<label for="swelling" class="my-auto">Διόγκωση</label>
								</div>
							</div>

							<input id="swelling" type="text" class="form-control"
								   v-model="clinicalExamination.swelling" maxlength="20">
							<minus-circle-outline v-if="!clinicalExamination.swelling"
												  class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
												  @click="removeField(fields.swelling)"/>
							<form-error v-if="response.errors.swelling"
										:error="response.errors.swelling[0]"/>
						</div>

						<div class="input-group row mb-2" v-if="fields.damages.display">
							<div class="input-group-prepend">
								<div class="input-group-text">
									<label for="damages" class="my-auto">Βλάβες</label>
								</div>
							</div>

							<input id="damages" type="text" class="form-control"
								   v-model="clinicalExamination.damages" maxlength="20">
							<minus-circle-outline v-if="!clinicalExamination.damages"
												  class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
												  @click="removeField(fields.damages)"/>
							<form-error v-if="response.errors.damages"
										:error="response.errors.damages[0]"/>
						</div>

						<div class="input-group row mb-2" v-if="fields.complexion.display">
							<div class="input-group-prepend">
								<div class="input-group-text">
									<label for="complexion" class="my-auto">Χροιά</label>
								</div>
							</div>

							<input id="complexion" type="text" class="form-control"
								   v-model="clinicalExamination.complexion" maxlength="20">
							<minus-circle-outline v-if="!clinicalExamination.complexion"
												  class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
												  @click="removeField(fields.complexion)"/>
							<form-error v-if="response.errors.complexion"
										:error="response.errors.complexion[0]"/>
						</div>

						<div class="input-group row mb-2" v-if="fields.convulsion.display">
							<div class="input-group-prepend">
								<div class="input-group-text">
									<label for="convulsion" class="my-auto">Συγχειλίτιδα</label>
								</div>
							</div>

							<input id="convulsion" type="text" class="form-control"
								   v-model="clinicalExamination.convulsion" maxlength="20">
							<minus-circle-outline v-if="!clinicalExamination.convulsion"
												  class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
												  @click="removeField(fields.convulsion)"/>
							<form-error v-if="response.errors.convulsion"
										:error="response.errors.convulsion[0]"/>
						</div>
					</div>
				</div>

				<div class="card mb-2 col-12" v-if="haveNeckFields">

					<div class="card-header row">
						<span>Τράχηλος</span>
					</div>

					<div class="card-body">

						<div class="input-group row mb-2" v-if="fields.neckEdema.display">
							<div class="input-group-prepend">
								<div class="input-group-text">
									<label for="neckEdema" class="my-auto">Τράχηλος : Οίδημα</label>
								</div>
							</div>

							<input id="neckEdema" type="text" class="form-control"
								   v-model="clinicalExamination.neckEdema" maxlength="20">
							<minus-circle-outline v-if="!clinicalExamination.neckEdema"
												  class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
												  @click="removeField(fields.neckEdema)"/>
							<form-error v-if="response.errors.neckEdema"
										:error="response.errors.neckEdema[0]"/>
						</div>

						<div class="input-group row mb-2" v-if="fields.neckSwelling.display">
							<div class="input-group-prepend">
								<div class="input-group-text">
									<label for="neckSwelling" class="my-auto">Τράχηλος : Διόγκωση</label>
								</div>
							</div>

							<input id="neckSwelling" type="text" class="form-control"
								   v-model="clinicalExamination.neckSwelling" maxlength="20">
							<minus-circle-outline v-if="!clinicalExamination.neckSwelling"
												  class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
												  @click="removeField(fields.neckSwelling)"/>
							<form-error v-if="response.errors.neckSwelling"
										:error="response.errors.neckSwelling[0]"/>
						</div>

						<div class="input-group row mb-2" v-if="fields.hypotensionLymphNodes.display">
							<div class="input-group-prepend">
								<div class="input-group-text">
									<label for="hypotensionLymphNodes" class="my-auto">Υπογενείδιοι λεμφαδένες</label>
								</div>
							</div>

							<input id="hypotensionLymphNodes" type="text" class="form-control"
								   v-model="clinicalExamination.hypotensionLymphNodes" maxlength="20">
							<minus-circle-outline v-if="!clinicalExamination.hypotensionLymphNodes"
												  class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
												  @click="removeField(fields.hypotensionLymphNodes)"/>
							<form-error v-if="response.errors.hypotensionLymphNodes"
										:error="response.errors.hypotensionLymphNodes[0]"/>
						</div>

						<div class="input-group row mb-2" v-if="fields.submandibularLymphNodes.display">
							<div class="input-group-prepend">
								<div class="input-group-text">
									<label for="submandibularLymphNodes" class="my-auto">Υπογνάθιοι λεμφαδένες</label>
								</div>
							</div>

							<input id="submandibularLymphNodes" type="text" class="form-control"
								   v-model="clinicalExamination.submandibularLymphNodes" maxlength="20">
							<minus-circle-outline v-if="!clinicalExamination.submandibularLymphNodes"
												  class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
												  @click="removeField(fields.submandibularLymphNodes)"/>
							<form-error v-if="response.errors.submandibularLymphNodes"
										:error="response.errors.submandibularLymphNodes[0]"/>
						</div>

						<div class="input-group row mb-2" v-if="fields.superficialCervicalLymphNodes.display">
							<div class="input-group-prepend">
								<div class="input-group-text">
									<label for="superficialCervicalLymphNodes"
										   class="my-auto">Επιπολής τραχηλικοί λεμφαδένες</label>
								</div>
							</div>

							<input id="superficialCervicalLymphNodes" type="text" class="form-control"
								   v-model="clinicalExamination.superficialCervicalLymphNodes" maxlength="20">
							<minus-circle-outline v-if="!clinicalExamination.superficialCervicalLymphNodes"
												  class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
												  @click="removeField(fields.superficialCervicalLymphNodes)"/>
							<form-error v-if="response.errors.superficialCervicalLymphNodes"
										:error="response.errors.superficialCervicalLymphNodes[0]"/>
						</div>

						<div class="input-group row mb-2" v-if="fields.InsideTheCervicalLymphNodes.display">
							<div class="input-group-prepend">
								<div class="input-group-text">
									<label for="InsideTheCervicalLymphNodes" class="my-auto">Εν τω βαθεί τραχηλικοί
										λεμφαδένες</label>
								</div>
							</div>

							<input id="InsideTheCervicalLymphNodes" type="text" class="form-control"
								   v-model="clinicalExamination.InsideTheCervicalLymphNodes" maxlength="20">
							<minus-circle-outline v-if="!clinicalExamination.InsideTheCervicalLymphNodes"
												  class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
												  @click="removeField(fields.InsideTheCervicalLymphNodes)"/>
							<form-error v-if="response.errors.InsideTheCervicalLymphNodes"
										:error="response.errors.InsideTheCervicalLymphNodes[0]"/>
						</div>
					</div>
				</div>

				<div class="card mb-2 col-12" v-if="haveKGDFields">
					<div class="card-header row">
						<span>ΚΓΔ</span>
					</div>

					<div class="card-body">

						<div class="input-group row mb-2" v-if="fields.clicking.display">
							<div class="input-group-prepend">
								<div class="input-group-text">
									<label for="clicking" class="my-auto">Clicking</label>
								</div>
							</div>

							<input id="clicking" type="text" class="form-control"
								   v-model="clinicalExamination.clicking" maxlength="20">
							<minus-circle-outline v-if="!clinicalExamination.clicking"
												  class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
												  @click="removeField(fields.clicking)"/>
							<form-error v-if="response.errors.clicking"
										:error="response.errors.clicking[0]"/>
						</div>

						<div class="input-group row mb-2" v-if="fields.cry.display">
							<div class="input-group-prepend">
								<div class="input-group-text">
									<label for="cry" class="my-auto">Κριγμός</label>
								</div>
							</div>

							<input id="cry" type="text" class="form-control"
								   v-model="clinicalExamination.cry" maxlength="20">
							<minus-circle-outline v-if="!clinicalExamination.cry"
												  class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
												  @click="removeField(fields.cry)"/>
							<form-error v-if="response.errors.cry"
										:error="response.errors.cry[0]"/>
						</div>

						<div class="input-group row mb-2" v-if="fields.painfulPalpationOfMuscles.display">
							<div class="input-group-prepend">
								<div class="input-group-text">
									<label for="painfulPalpationOfMuscles" class="my-auto">Επώδυνη ψηλάφηση μυών</label>
								</div>
							</div>

							<input id="painfulPalpationOfMuscles" type="text" class="form-control"
								   v-model="clinicalExamination.painfulPalpationOfMuscles" maxlength="20">
							<minus-circle-outline v-if="!clinicalExamination.painfulPalpationOfMuscles"
												  class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
												  @click="removeField(fields.painfulPalpationOfMuscles)"/>
							<form-error v-if="response.errors.painfulPalpationOfMuscles"
										:error="response.errors.painfulPalpationOfMuscles[0]"/>
						</div>

						<div class="input-group row mb-2" v-if="fields.reducedMobility.display">
							<div class="input-group-prepend">
								<div class="input-group-text">
									<label for="reducedMobility" class="my-auto">Μειωμένη κινητικότητα</label>
								</div>
							</div>

							<input id="reducedMobility" type="text" class="form-control"
								   v-model="clinicalExamination.reducedMobility" maxlength="20">
							<minus-circle-outline v-if="!clinicalExamination.reducedMobility"
												  class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
												  @click="removeField(fields.reducedMobility)"/>
							<form-error v-if="response.errors.reducedMobility"
										:error="response.errors.reducedMobility[0]"/>
						</div>

						<div class="input-group row mb-2" v-if="fields.deratingWhenOpening.display">
							<div class="input-group-prepend">
								<div class="input-group-text">
									<label for="deratingWhenOpening" class="my-auto">Παρέκκλιση κατά τη διάνοιξη</label>
								</div>
							</div>

							<input id="deratingWhenOpening" type="text" class="form-control"
								   v-model="clinicalExamination.deratingWhenOpening" maxlength="20">
							<minus-circle-outline v-if="!clinicalExamination.deratingWhenOpening"
												  class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
												  @click="removeField(fields.deratingWhenOpening)"/>
							<form-error v-if="response.errors.deratingWhenOpening"
										:error="response.errors.deratingWhenOpening[0]"/>
						</div>

						<div class="input-group row mb-2" v-if="fields.impairedOpening.display">
							<div class="input-group-prepend">
								<div class="input-group-text">
									<label for="impairedOpening" class="my-auto">Ελαττωμένη διάνοιξη</label>
								</div>
							</div>

							<input id="impairedOpening" type="text" class="form-control"
								   v-model="clinicalExamination.impairedOpening" maxlength="20">
							<minus-circle-outline v-if="!clinicalExamination.impairedOpening"
												  class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
												  @click="removeField(fields.impairedOpening)"/>
							<form-error v-if="response.errors.impairedOpening"
										:error="response.errors.impairedOpening[0]"/>
						</div>

					</div>
				</div>

				<div class="card mb-2 col-12" v-if="haveSalivaryGlands">
					<div class="card-header row">
						<span>Σιελογόνοι Αδένες</span>
					</div>

					<div class="card-body">

						<div class="input-group row mb-2" v-if="fields.tonsil.display">
							<div class="input-group-prepend">
								<div class="input-group-text">
									<label for="tonsil" class="my-auto">Παρωτίδα</label>
								</div>
							</div>

							<input id="tonsil" type="text" class="form-control"
								   v-model="clinicalExamination.tonsil" maxlength="20">
							<minus-circle-outline v-if="!clinicalExamination.tonsil"
												  class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
												  @click="removeField(fields.tonsil)"/>
							<form-error v-if="response.errors.tonsil"
										:error="response.errors.tonsil[0]"/>
						</div>

						<div class="input-group row mb-2" v-if="fields.underTheJaw.display">
							<div class="input-group-prepend">
								<div class="input-group-text">
									<label for="underTheJaw" class="my-auto">Υπογνάθιος</label>
								</div>
							</div>

							<input id="underTheJaw" type="text" class="form-control"
								   v-model="clinicalExamination.underTheJaw" maxlength="20">
							<minus-circle-outline v-if="!clinicalExamination.underTheJaw"
												  class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
												  @click="removeField(fields.underTheJaw)"/>
							<form-error v-if="response.errors.underTheJaw"
										:error="response.errors.underTheJaw[0]"/>
						</div>

					</div>
				</div>

			</div>

			<div class="col-lg-6 col-12">

				<div class="col-12 text-center">
					<h3>Ενδοστοματική</h3>
				</div>

				<div class="input-group row mb-2" v-if="fields.lips.display">
					<div class="input-group-prepend">
						<div class="input-group-text">
							<label for="lips" class="my-auto">Χείλη</label>
						</div>
					</div>

					<input id="lips" type="text" class="form-control"
						   v-model="clinicalExamination.lips" maxlength="20">
					<minus-circle-outline v-if="!clinicalExamination.lips"
										  class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
										  @click="removeField(fields.lips)"/>
					<form-error v-if="response.errors.lips"
								:error="response.errors.lips[0]"/>
				</div>

				<div class="input-group row mb-2" v-if="fields.jowl.display">
					<div class="input-group-prepend">
						<div class="input-group-text">
							<label for="jowl" class="my-auto">Παρεία</label>
						</div>
					</div>

					<input id="jowl" type="text" class="form-control"
						   v-model="clinicalExamination.jowl" maxlength="20">
					<minus-circle-outline v-if="!clinicalExamination.jowl"
										  class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
										  @click="removeField(fields.jowl)"/>
					<form-error v-if="response.errors.jowl"
								:error="response.errors.jowl[0]"/>
				</div>

				<div class="input-group row mb-2" v-if="fields.palate.display">
					<div class="input-group-prepend">
						<div class="input-group-text">
							<label for="palate" class="my-auto">Υπερώα</label>
						</div>
					</div>

					<input id="palate" type="text" class="form-control"
						   v-model="clinicalExamination.palate" maxlength="20">
					<minus-circle-outline v-if="!clinicalExamination.palate"
										  class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
										  @click="removeField(fields.palate)"/>
					<form-error v-if="response.errors.palate"
								:error="response.errors.palate[0]"/>
				</div>

				<div class="input-group row mb-2" v-if="fields.oralGround.display">
					<div class="input-group-prepend">
						<div class="input-group-text">
							<label for="oralGround" class="my-auto">Έδαφος στόματος</label>
						</div>
					</div>

					<input id="oralGround" type="text" class="form-control"
						   v-model="clinicalExamination.oralGround" maxlength="20">
					<minus-circle-outline v-if="!clinicalExamination.oralGround"
										  class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
										  @click="removeField(fields.oralGround)"/>
					<form-error v-if="response.errors.oralGround"
								:error="response.errors.oralGround[0]"/>
				</div>

				<div class="input-group row mb-2" v-if="fields.tongue.display">
					<div class="input-group-prepend">
						<div class="input-group-text">
							<label for="tongue" class="my-auto">Γλώσσα</label>
						</div>
					</div>

					<input id="tongue" type="text" class="form-control"
						   v-model="clinicalExamination.tongue" maxlength="20">
					<minus-circle-outline v-if="!clinicalExamination.tongue"
										  class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
										  @click="removeField(fields.tongue)"/>
					<form-error v-if="response.errors.tongue"
								:error="response.errors.tongue[0]"/>
				</div>

				<div class="input-group row mb-2" v-if="fields.oralPharynx.display">
					<div class="input-group-prepend">
						<div class="input-group-text">
							<label for="oralPharynx" class="my-auto">Στοματοφάρρυγας</label>
						</div>
					</div>

					<input id="oralPharynx" type="text" class="form-control"
						   v-model="clinicalExamination.oralPharynx" maxlength="20">
					<minus-circle-outline v-if="!clinicalExamination.oralPharynx"
										  class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
										  @click="removeField(fields.oralPharynx)"/>
					<form-error v-if="response.errors.oralPharynx"
								:error="response.errors.oralPharynx[0]"/>
				</div>

				<div class="input-group row mb-2" v-if="fields.hawks.display">
					<div class="input-group-prepend">
						<div class="input-group-text">
							<label for="hawks" class="my-auto">Χαλινοί</label>
						</div>
					</div>

					<input id="hawks" type="text" class="form-control"
						   v-model="clinicalExamination.hawks" maxlength="20">
					<minus-circle-outline v-if="!clinicalExamination.hawks"
										  class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
										  @click="removeField(fields.hawks)"/>
					<form-error v-if="response.errors.hawks"
								:error="response.errors.hawks[0]"/>
				</div>

				<div class="input-group row mb-2" v-if="fields.alveolarProcess.display">
					<div class="input-group-prepend">
						<div class="input-group-text">
							<label for="alveolarProcess" class="my-auto">Φατνιακή απόφυση</label>
						</div>
					</div>

					<input id="alveolarProcess" type="text" class="form-control"
						   v-model="clinicalExamination.alveolarProcess" maxlength="20">
					<minus-circle-outline v-if="!clinicalExamination.alveolarProcess"
										  class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
										  @click="removeField(fields.alveolarProcess)"/>
					<form-error v-if="response.errors.alveolarProcess"
								:error="response.errors.alveolarProcess[0]"/>
				</div>

			</div>

		</form>

		<div class="row" v-if="fieldSelected">
			<input type="submit" class="btn btn-success col-lg-6 col-12 my-3 mx-auto"
				   @click="updateClinicalExamination" value="Αποθήκευση">
		</div>

		<div class="row fixed-bottom mb-2">
			<display-error class="mx-auto"
						   v-if="response.message"
						   :response="response"/>
		</div>

	</div>

</template>

<script>
	import FormError from '@/components/basic/FormError'
	import FieldsList from '@/components/patients/FieldsList'
	import utility from '../../library/utility'
	import api from '../../api'
	import DisplayError from '@/components/basic/DisplayError'

	export default {
		components: {FormError, FieldsList, DisplayError},

		data() {
			return {
				response: {
					message: ' ',
					status: '',
					errors: []
				},

				fields: {
					edema: {
						label: 'Οίδημα',
						display: false
					},
					asymmetry: {
						label: 'Ασυμμετρία',
						display: false
					},
					swelling: {
						label: 'Διόγκωση',
						display: false
					},
					damages: {
						label: 'Βλάβες',
						display: false
					},
					complexion: {
						label: 'Χροιά',
						display: false
					},
					convulsion: {
						label: 'Συγχειλίτιδα',
						display: false
					},
					neckEdema: {
						label: 'Τράχηλος : Οίδημα',
						display: false
					},
					neckSwelling: {
						label: 'Τράχηλος : Διόγκωση',
						display: false
					},
					hypotensionLymphNodes: {
						label: 'Υπογενείδιοι λεμφαδένες',
						display: false
					},
					submandibularLymphNodes: {
						label: 'Υπογνάθιοι λεμφαδένες',
						display: false
					},
					superficialCervicalLymphNodes: {
						label: 'Επιπολής τραχηλικοί λεμφαδένες',
						display: false
					},
					InsideTheCervicalLymphNodes: {
						label: 'Εν τω βαθεί τραχηλικοί λεμφαδένες',
						display: false
					},
					clicking: {
						label: 'Clicking',
						display: false
					},
					cry: {
						label: 'Κριγμός',
						display: false
					},
					painfulPalpationOfMuscles: {
						label: 'Επώδυνη ψηλάφηση μυών',
						display: false
					},
					reducedMobility: {
						label: 'Μειωμένη κινητικότητα',
						display: false
					},
					deratingWhenOpening: {
						label: 'Παρέκκλιση κατά τη διάνοιξη',
						display: false
					},
					impairedOpening: {
						label: 'Ελαττωμένη διάνοιξη',
						display: false
					},
					tonsil: {
						label: 'Παρωτίδα',
						display: false
					},
					underTheJaw: {
						label: 'Υπογνάθιος',
						display: false
					},
					lips: {
						label: 'Χείλη',
						display: false
					},
					jowl: {
						label: 'Παρεία',
						display: false
					},
					palate: {
						label: 'Υπερώα',
						display: false
					},
					oralGround: {
						label: 'Έδαφος στόματος',
						display: false
					},
					tongue: {
						label: 'Γλώσσα',
						display: false
					},
					oralPharynx: {
						label: 'Στοματοφάρρυγας',
						display: false
					},
					hawks: {
						label: 'Χαλινοί',
						display: false
					},
					alveolarProcess: {
						label: 'Φατνιακή απόφυση',
						display: false
					}
				},

				clinicalExamination: {
					edema: null,
					asymmetry: null,
					swelling: null,
					damages: null,
					complexion: null,
					convulsion: null,
					neckEdema: null,
					neckSwelling: null,
					hypotensionLymphNodes: null,
					submandibularLymphNodes: null,
					superficialCervicalLymphNodes: null,
					InsideTheCervicalLymphNodes: null,
					clicking: null,
					cry: null,
					painfulPalpationOfMuscles: null,
					reducedMobility: null,
					deratingWhenOpening: null,
					impairedOpening: null,
					tonsil: null,
					underTheJaw: null,
					lips: null,
					jowl: null,
					palate: null,
					oralGround: null,
					tongue: null,
					oralPharynx: null,
					hawks: null,
					alveolarProcess: null
				},

				loading: false

			}
		},

		computed: {
			// Find if any field is selected. True if any
			fieldSelected() {
				return Object.values(this.fields).find((field) => {
					return field.display
				})
			},

			// Check if any of face fields are enabled
			haveFaceFields () {
				return (
					this.fields.edema.display ||
					this.fields.asymmetry.display ||
					this.fields.swelling.display ||
					this.fields.damages.display ||
					this.fields.complexion.display ||
					this.fields.convulsion.display
				)
			},

			// Check if any of neck fields are enabled
			haveNeckFields () {
				return (
					this.fields.neckEdema.display ||
					this.fields.neckSwelling.display ||
					this.fields.hypotensionLymphNodes.display ||
					this.fields.submandibularLymphNodes.display ||
					this.fields.superficialCervicalLymphNodes.display ||
					this.fields.InsideTheCervicalLymphNodes.display
				)
			},

			// Check if any of KGD fields are enabled
			haveKGDFields () {
				return (
					this.fields.clicking.display ||
					this.fields.cry.display ||
					this.fields.painfulPalpationOfMuscles.display ||
					this.fields.reducedMobility.display ||
					this.fields.deratingWhenOpening.display ||
					this.fields.impairedOpening.display
				)
			},

			// Check if any of Salivary fields are enabled
			haveSalivaryGlands () {
				return (
					this.fields.tonsil.display ||
					this.fields.underTheJaw.display
				)
			},

			patientId: function () {
				return this.$route.params.id
			}
		},

		watch: {
			loading() {
				this.$emit('loading', this.loading)
			}
		},

		created: function () {
			this.getClinicalExamination()
		},

		methods: {
			/**
			 * Get Clinical Examination info
			 */
			getClinicalExamination() {
				this.loading = true

				api.getClinicalExamination(this.patientId)
					.then(response => {
						this.loading = false

						if (response.status === 200) {
							this.clinicalExamination = response.data

							this.checkFields()
						}
					})
					.catch(error => {
						this.loading = false

						this.response.message = error.response.data.message
						this.response.status = false

						utility.debug(error.response.data.debug)
					})
			},

			/**
			 * Update the Clinical Examination info
			 */
			updateClinicalExamination() {
				this.loading = true

				api.updateClinicalExamination(this.clinicalExamination, this.patientId)
					.then(response => {
						this.loading = false

						this.response.message = 'Τα δεδομένα αποθηκεύτηκαν'
						this.response.status = true
					})
					.catch(error => {
						this.loading = false

						this.response.message = error.response.data.message
						this.response.status = false

						if (error.response.data.errors) {
							this.response.errors = error.response.data.errors
						}

						utility.debug(error.response.data.debug)
					})
			},

			/**
			 * Check for fields. If not empty, display it
			 */
			checkFields() {
				Object.keys(this.clinicalExamination).forEach(key => {
					if (this.clinicalExamination[key] === null || this.clinicalExamination[key].length < 1) {
						return
					}

					if (this.fields[key] === undefined) {
						return
					}

					this.fields[key].display = true
				})
			},

			/**
			 * Εξαφάνιση του πεδίου
			 *
			 * @param field
			 */
			removeField(field) {
				field.display = false
			}
		}
	}
</script>

<style lang="scss" scoped>

	input[type=checkbox] {
		/* Double-sized Checkboxes */
		-ms-transform: scale(2); /* IE */
		-moz-transform: scale(2); /* FF */
		-webkit-transform: scale(2); /* Safari and Chrome */
		-o-transform: scale(2); /* Opera */
		padding: 10px;
	}

	.removeItem {
		cursor: pointer;
	}

</style>
