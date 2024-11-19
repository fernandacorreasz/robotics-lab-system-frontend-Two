import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Button, message, Row, Col, Cascader, Card } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { uploadComponentsJSON, fetchCategoriesWithSubcategories } from "../../../services/ComponentService";
import { Category } from "../../../models/Category";
import RoboticImage from "../../../assets/img/robotic.png";

const BulkAddComponentsPage: React.FC = () => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState<
    { value: string; label: string; children: { value: string; label: string }[] }[]
  >([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data: Category[] = await fetchCategoriesWithSubcategories();
        const cascaderData = data.map((category) => ({
          value: category.categoryName,
          label: category.categoryName,
          children: category.subcategories.map((sub) => ({
            value: sub.subCategoryName,
            label: sub.subCategoryName,
          })),
        }));
        setCategories(cascaderData);
      } catch {
        message.error("Erro ao carregar categorias e subcategorias.");
      }
    };

    loadCategories();
  }, []);

  const handleAddComponents = async () => {
    try {
      const values = form.getFieldsValue();
      const formattedData = values.components.map((component: {
        name: string;
        serialNumber: string;
        description: string;
        quantity: number;
        subCategoryName: string;
      }) => ({
        name: component.name,
        serialNumber: component.serialNumber,
        description: component.description,
        quantity: component.quantity,
        subCategory: { subCategoryName: component.subCategoryName },
      }));

      await uploadComponentsJSON(formattedData);

      message.success("Componentes adicionados com sucesso!");
      form.resetFields();
    } catch {
      message.error("Erro ao adicionar componentes.");
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "left" }}>
      <Card
        style={{
          marginBottom: "20px",
          padding: "12px",
          borderRadius: "10px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Row align="middle" justify="start">
          <Col span={20}>
            <h4 style={{ color: "#69c4d3", margin: 0, textAlign: "left" }}>
              Controle de Estoque de Componentes
            </h4>
            <p style={{ margin: 0, textAlign: "left" }}>
              Utilize esta tela para adicionar múltiplos componentes ao estoque de forma manual.
              Preencha as informações dos componentes e selecione a subcategoria correspondente.
            </p>
          </Col>
          <Col span={4}>
            <img
              src={RoboticImage}
              alt="Robô"
              style={{
                width: "60px",
                display: "block",
                marginLeft: "auto",
              }}
            />
          </Col>
        </Row>
      </Card>

      <Form form={form} layout="vertical" onFinish={handleAddComponents}>
        <Form.List name="components" initialValue={[{}]}>
          {(fields, { add, remove }) => (
            <div style={{ maxWidth: "800px" }}>
              {fields.map((field, index) => (
                <Row key={field.key} gutter={8} style={{ marginBottom: 8 }}>
                  <Col span={5}>
                    <Form.Item
                      {...field}
                      name={[field.name, "name"]}
                      rules={[{ required: true, message: "Insira o nome" }]}
                    >
                      <Input placeholder="Nome" />
                    </Form.Item>
                  </Col>
                  <Col span={5}>
                    <Form.Item
                      {...field}
                      name={[field.name, "serialNumber"]}
                      rules={[{ required: true, message: "Insira o número de série" }]}
                    >
                      <Input placeholder="Número de Série" />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      {...field}
                      name={[field.name, "description"]}
                      rules={[{ required: true, message: "Insira a descrição" }]}
                    >
                      <Input placeholder="Descrição" />
                    </Form.Item>
                  </Col>
                  <Col span={3}>
                    <Form.Item
                      {...field}
                      name={[field.name, "quantity"]}
                      rules={[{ required: true, message: "Insira a quantidade" }]}
                    >
                      <InputNumber placeholder="Qtd." style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item
                      {...field}
                      name={[field.name, "subCategoryName"]}
                      rules={[{ required: true, message: "Selecione a subcategoria" }]}
                    >
                      <Cascader
                        options={categories}
                        placeholder="Subcategoria"
                        showSearch
                        style={{ width: "100%" }}
                        onChange={(value) => {
                          form.setFieldValue(
                            ["components", field.name, "subCategoryName"],
                            value[value.length - 1]
                          );
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={1}>
                    {index === 0 ? (
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        icon={<PlusOutlined />}
                        style={{ width: "100%" }}
                      />
                    ) : (
                      <Button
                        onClick={() => remove(field.name)}
                        type="link"
                        icon={<DeleteOutlined />}
                        danger
                      />
                    )}
                  </Col>
                </Row>
              ))}
            </div>
          )}
        </Form.List>
        <Button
          type="primary"
          htmlType="submit"
          style={{ marginTop: "20px", width: "200px" }}
        >
          Adicionar Componentes
        </Button>
      </Form>
    </div>
  );
};

export default BulkAddComponentsPage;
