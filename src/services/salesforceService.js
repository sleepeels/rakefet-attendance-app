const { conn } = require("../config/salesforce");

// 👉 tweak API names if your org uses different fields
module.exports = {
  async findContactByEmail(email) {
    console.log("findcontact func");
    const soql = `
    SELECT Id, guide_email__c
    FROM pmdm__ProgramEngagement__c
    WHERE guide_email__c = '${email}'
    LIMIT 1
    `;
    const res = await conn.query(soql, { email });
    return res.records[0] || null;
  },

  async getSchedulesByGuideEmail(email) {
    const soql = `
      SELECT Id, Name
      FROM pmdm__ServiceSchedule__c
      WHERE guide_email__c = '${email}'
    `;
    const result = await conn.query(soql, { email });
    return result.records;
  },

  async getSessionsBySchedule(scheduleId) {
    const soql = `
      SELECT Id, Name, pmdm__Status__c,pmdm__SessionStart__c
      FROM pmdm__ServiceSession__c
      WHERE pmdm__ServiceSchedule__c = '${scheduleId}'
     ORDER BY pmdm__SessionStart__c ASC
    `;
    const result = await conn.query(soql, { scheduleId });
    return result.records;
  },
  async updateSession(id, fields) {
    return conn
      .sobject("pmdm__ServiceSession__c")
      .update({ Id: id, ...fields });
  },

  async deleteSession(id) {
    return conn.sobject("pmdm__ServiceSession__c").destroy(id);
  },
};
