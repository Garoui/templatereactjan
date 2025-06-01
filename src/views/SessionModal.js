import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, DatePicker, TimePicker, Button } from 'antd';
import moment from 'moment';
import 'moment/locale/fr';
const { Option } = Select;
const { TextArea } = Input;

const SessionModal = ({
  open,
  onCancel,
  onFinish,
  form,
   formateurs = [],  // Default empty array to prevent undefined errors
  apprenants = [],
  initialValues,
  loading,
}) => {
 useEffect(() => {
    if (open) {
      if (initialValues) {
        form.setFieldsValue({
          ...initialValues,
          date: moment(initialValues.start),
          time: [
            moment(initialValues.start),
            moment(initialValues.end)
          ]
        });
      } else {
        form.resetFields();
      }
    }
  }, [open, initialValues, form]);

  return (
    <Modal
      title={initialValues?.id ? 'Modifier la Session' : 'Ajouter une Nouvelle Session'}
            open={open}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Annuler
        </Button>,
        
          <Button
            key="submit"
            type="primary"
            onClick={() => form.submit()}
          loading={loading}
        >
          {initialValues ? 'Mettre à jour' : 'Créer'}
        </Button>,
      ]}
      width={700}
      destroyOnHidden
    >
       <Form
        form={form}
        layout="vertical"
        initialValues={{
          type: 'online'
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="title"
          label="Titre de la Session"
          rules={[{ required: true, message: 'Veuillez entrer un titre' }]}
        >
          <Input placeholder="Ex: React JS" />
        </Form.Item>

        <Form.Item
          name="date"
          label="Date"
          rules={[{ required: true, message: 'Veuillez sélectionner une date' }]}
        >
          <DatePicker
            style={{ width: '100%' }}
            disabledDate={(current) => current && current < moment().startOf('day')}
            placeholder="Sélectionnez une date"
            
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
            placeholder={['Heure début', 'Heure fin']}
          />
        </Form.Item>

        <Form.Item
          name="formateur"
          label="Formateur"
          rules={[{ required: true, message: 'Veuillez sélectionner un formateur' }]}
        >
          <Select placeholder="Sélectionnez un formateur"
          loading={loading}
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          
            }
          
          >
            {formateurs.map((f) => (
              <Option key={f._id} value={f._id}>
                {f.nom} {f.prenom}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="apprenants"
          label="Apprenants"
          rules={[{ required: true, message: 'Veuillez sélectionner au moins un apprenant' }]}
        >
          <Select mode="multiple" placeholder="Sélectionnez les apprenants"
           loading={loading}
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }>
            {apprenants.map((a) => (
              <Option key={a._id} value={a._id}>
                {a.nom} {a.prenom}
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