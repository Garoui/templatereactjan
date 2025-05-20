import React from 'react';
import { Modal, Form, Input, Select, DatePicker, TimePicker, Button } from 'antd';
import moment from 'moment';

const { Option } = Select;
const { TextArea } = Input;

const SessionModal = ({
  open,
  onCancel,
  onFinish,
  form,
  formateurs,
  apprenants,
  initialValues,
}) => {
  return (
    <Modal
      title={initialValues?.id ? "Modifier la Session" : "Ajouter une Nouvelle Session"}
      open={open}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Annuler
        </Button>,
        <Button key="submit" type="primary" onClick={() => form.submit()}>
          {initialValues?.id ? "Mettre à jour" : "Créer"}
        </Button>,
      ]}
      width={700}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues || {
          type: 'online',
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="title"
          label="Titre de la Session"
          rules={[{ required: true, message: 'Veuillez entrer un titre' }]}
        >
          <Input placeholder="Ex: Introduction au Français" />
        </Form.Item>

        <Form.Item
          name="date"
          label="Date"
          rules={[{ required: true, message: 'Veuillez sélectionner une date' }]}
        >
          <DatePicker 
            style={{ width: '100%' }} 
            disabledDate={(current) => current && current < moment().startOf('day')}
          />
        </Form.Item>

        <Form.Item
          name="time"
          label="Heure de début et fin"
          rules={[{ required: true, message: 'Veuillez sélectionner une plage horaire' }]}
        >
          <TimePicker.RangePicker 
            style={{ width: '100%' }}
            format="HH:mm"
            minuteStep={15}
          />
        </Form.Item>

        <Form.Item
          name="formateur"
          label="Formateur"
          rules={[{ required: true, message: 'Veuillez sélectionner un formateur' }]}
        >
          <Select placeholder="Sélectionnez un formateur">
            {formateurs.map(formateur => (
              <Option key={formateur._id} value={formateur._id}>
                {formateur.nom} {formateur.prenom}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="apprenants"
          label="Apprenants"
          rules={[{ required: true, message: 'Veuillez sélectionner au moins un apprenant' }]}
        >
          <Select mode="multiple" placeholder="Sélectionnez les apprenants">
            {apprenants.map(apprenant => (
              <Option key={apprenant._id} value={apprenant._id}>
                {apprenant.nom} {apprenant.prenom}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="type"
          label="Type de Session"
          rules={[{ required: true, message: 'Veuillez sélectionner un type' }]}
        >
          <Select>
            <Option value="online">En ligne</Option>
            <Option value="presentiel">Présentiel</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
        >
          <TextArea rows={4} placeholder="Description de la session (optionnel)" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SessionModal;