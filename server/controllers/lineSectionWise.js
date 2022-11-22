const db = require("./db");

const get = async (req, res) => {
  const { lineID, sectionID } = req.query;
  console.log(lineID,sectionID);
  try {
    const line = await db.sequelize.query(
      `SELECT LineDescription FROM [Essentials].[Line] WHERE lineID = :lineID`,
      {
        replacements: { lineID },
        type: db.sequelize.QueryTypes.SELECT,
      }
    );
    const section = await db.sequelize.query(
      `SELECT SectionDescription FROM [Essentials].[Section] WHERE sectionID = :sectionID`,
      {
        replacements: { sectionID },
        type: db.sequelize.QueryTypes.SELECT,
      }
    );
    const TodayDHU = await db.sequelize.query(
      `select  isnull(CAST(CAST(SUM(TotalFaults) as float)/CAST(count(PieceID) as float) * 100.0 as decimal(10,2)),0) AS TodayDHU
	  from [dbo].[vw_EndLineSession] where  createdAtDate=cast(getdate() as date) and
	  LineID=:lineID and sectionID=:sectionID `,
      {
        replacements: { lineID, sectionID },
        type: db.sequelize.QueryTypes.SELECT,
      }
    );
    const Top3FaultyOperations = await db.sequelize.query(
      `	select TOP 3 ISNULL(SUM(FaultCount),0) AS TotalFaults, OperationDescription from [dbo].[vw_EndLineSession] ES
	  join [dbo].[vw_EndlineFaultLog] EFL
	  on ES.EndLineSessionID= EFL.EndLineSessionID
	  where ES.createdAtDate = cast(getdate() as date) and
	  LineID=:lineID and sectionID=:sectionID
	  GROUP BY OperationDescription
	  ORDER BY SUM(FaultCount) DESC`,
      {
        replacements: { lineID, sectionID },
        type: db.sequelize.QueryTypes.SELECT,
      }
    );
    const TodayDefectRatio = await db.sequelize.query(
      `select ISNULL(SUM(TotalFaults),0) AS TotalFaults, count(PieceID) as CheckedPieces  from  [dbo].[vw_EndLineSession] es
      where ES.createdAtDate = cast(getdate() as date) and
	   LineID=:lineID and sectionID=:sectionID
	  ORDER BY SUM(TotalFaults) DESC`,
      {
        replacements: { lineID, sectionID },
        type: db.sequelize.QueryTypes.SELECT,
      }
    );
    const FaultPercentageWise = await db.sequelize.query(
      ` SELECT  FaultDescription,FaultPercetage as FaultPercentage,TotalFaults
          FROM [dbo].[Line_SectionWise_FaultPercentage] where FaultDate =cast(GETDATE() as date)
      and  LineID=:lineID AND SectionID=:sectionID`,
      {
        replacements: { lineID, sectionID },
        type: db.sequelize.QueryTypes.SELECT,
      }
    );

    // PAGE 2

    const InlineFlagStatus = await db.sequelize.query(
      `select RoundColor,count(*)RoundTotal from [dbo].[vw_InlineSession]
      where  CreatedAtDate=cast(getdate() as date) and
      LineID=:lineID AND SectionID=:sectionID
      group by RoundColor`,
      {
        replacements: { lineID, sectionID },
        type: db.sequelize.QueryTypes.SELECT,
      }
    );

    const InlineDhuCpTf = await db.sequelize.query(
      `select sum(CheckedPices)CheckedPcs,sum(TotalFaults)TotalFaults,isnull(CAST(CAST(SUM(TotalFaults) as float) /CAST(sum(CheckedPices) as float) * 100.0 as decimal(10,2)),0) AS TodayDHU
      from [dbo].[vw_InlineSession]
       where  CreatedAtDate=cast(getdate() as date) and
       LineID=:lineID AND SectionID=:sectionID`,
      {
        replacements: { lineID, sectionID },
        type: db.sequelize.QueryTypes.SELECT,
      }
    )

    const WorkerWiseFlagRatio = await db.sequelize.query(
      `select WorkerID,WorkerCode,WorkerDescription,RoundColor,count(*)RoundTotal from [dbo].[vw_InlineSession]
      where  CreatedAtDate=cast(getdate() as date) and
      LineID=:lineID AND SectionID=:sectionID
      group by WorkerID,WorkerCode,WorkerDescription,RoundColor`,
      {
        replacements: { lineID, sectionID },
        type: db.sequelize.QueryTypes.SELECT,
      }
    )

    const MachineWiseFlagRatio = await db.sequelize.query(
      `select MachineID,MachineCode,MachineDescription,RoundColor,count(*)RoundTotal from [dbo].[vw_InlineSession]
      where  CreatedAtDate=cast(getdate() as date) and
      LineID=:lineID AND SectionID=:sectionID
      group by MachineID,MachineCode,MachineDescription,RoundColor`,
      {
        replacements: { lineID, sectionID },
        type: db.sequelize.QueryTypes.SELECT,
      }
    )

    const OprationWiseFaultRatio = await db.sequelize.query(
      `select sum(CheckedPices)CheckedPcs,sum(DefectedPieces)DefectedPcs, OperationID,OperationCode,OperationDescription
      from [dbo].[vw_InlineSession]
       where  CreatedAtDate=cast(getdate() as date) and
       LineID=:lineID AND SectionID=:sectionID
      group by  OperationID,OperationCode,OperationDescription`,
      {
        replacements: { lineID, sectionID },
        type: db.sequelize.QueryTypes.SELECT,
      }
    )

    const TopBestAndWordWorkers = await db.sequelize.query(
      `select * from (select WorkerID,WorkerCode,WorkerDescription,sum(CheckedPices)CheckedPcs,sum(TotalFaults)TotalFaults,isnull(CAST(CAST(SUM(TotalFaults) as float) /CAST(sum(CheckedPices) as float) * 100.0 as decimal(10,2)),0) AS TodayDHU
      from [dbo].[vw_InlineSession]
        where  CreatedAtDate=cast(getdate() as date) and
        LineID=:lineID AND SectionID=:sectionID
       group by WorkerID,WorkerCode,WorkerDescription) tab1 
       order by TodayDHU desc`,
      {
        replacements: { lineID, sectionID },
        type: db.sequelize.QueryTypes.SELECT,
      }
    )

    

    // const OrderDetails = await db.sequelize.query(
    //   `SELECT ISNULL(SUM(OrderQuantity), 0) AS TotalQuantity, ISNULL(SUM(Production), 0) AS ProductionTillDate, ISNULL(SUM(Balance), 0) AS Balance,
    //   ISNULL(SUM(TodayProduction), 0) AS TodayProduction, CBLStyle, OrderStatus, PpcOrderNum FROM [dbo].[vwLineSectionProgressLCD_CurrentShift]
    //   WHERE LineCode = :lineCode AND SectionCode = :sectionCode
    //   GROUP BY CBLStyle, OrderStatus, PpcOrderNum`,
    //   {
    //     replacements: { lineCode, sectionCode },
    //     type: db.sequelize.QueryTypes.SELECT,
    //   }
    // );

    return res.status(200).json({
      line,
      section,
      TodayDHU,
      Top3FaultyOperations,
      TodayDefectRatio,
      FaultPercentageWise,
      //   OrderDetails
      //PAGE 2
      InlineFlagStatus,
      InlineDhuCpTf,
      WorkerWiseFlagRatio,
      MachineWiseFlagRatio,
      OprationWiseFaultRatio,
      TopBestAndWordWorkers
    });
  } catch (e) {
    return res.status(500).json(e.toString());
  }
};

module.exports = { get };
